const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// --- BFF: Rate limiting manual (por IP) ---
const rateLimitStore = new Map();
const rateLimit = (maxReqs, windowMs) => (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  if (!rateLimitStore.has(ip)) rateLimitStore.set(ip, []);
  const timestamps = rateLimitStore.get(ip).filter(t => now - t < windowMs);
  if (timestamps.length >= maxReqs) return res.status(429).json({ error: 'Too many requests' });
  timestamps.push(now);
  rateLimitStore.set(ip, timestamps);
  next();
};

// --- BFF: Auth delegation (el BFF maneja tokens, Angular nunca los ve) ---
const TOKEN_STORE = new Map(); // sessionId -> { githubToken, user }
let sessionCounter = 0;
const seedSession = { githubToken: 'gho_xxxxx', user: { id: 1, name: 'Alice García', email: 'alice@example.com', role: 'admin' } };
TOKEN_STORE.set('session-123', seedSession);

app.post('/api/bff/login', (req, res) => {
  const sessionId = `session-demo-${++sessionCounter}`;
  TOKEN_STORE.set(sessionId, seedSession);
  res.json({ sessionId, user: sanitizeUser(seedSession.user) });
});

const authCheck = (req, res, next) => {
  const sessionId = req.headers['x-session-id'];
  if (!sessionId || !TOKEN_STORE.has(sessionId)) return res.status(401).json({ error: 'Unauthorized' });
  req.session = TOKEN_STORE.get(sessionId);
  next();
};

// --- BFF: Sanitización (nunca enviamos datos sensibles al frontend) ---
const sanitizeUser = (user) => {
  const { numSeguroSocial, password, tarjetaCredito, ...safe } = user;
  return safe;
};

// --- Mock Backends Internos (el frontend no los conoce directamente) ---
const BACKEND_USERS = { 1: { id: 1, name: 'Alice García', email: 'alice@example.com', role: 'admin', numSeguroSocial: '***-**-1234', tarjetaCredito: '4532-****-****-1111' } };
const BACKEND_ORDERS = [
  { id: 101, userId: 1, product: 'Laptop', quantity: 1, total: 1500, status: 'shipped' },
  { id: 102, userId: 1, product: 'Mouse', quantity: 2, total: 80, status: 'pending' },
];
const BACKEND_PRODUCTS = [
  { id: 1, name: 'Laptop', price: 1500, stock: 5, category: 'electronics' },
  { id: 2, name: 'Mouse', price: 40, stock: 20, category: 'accessories' },
];

// --- BFF: Endpoint único de agregación ---
// Antes (sin BFF): Angular llamaba 3 APIs = 3 latencias + 3 auth checks
// Ahora (con BFF):   Angular llama 1 vez, el BFF agrega internamente
app.get('/api/bff/dashboard', rateLimit(10, 60000), authCheck, (req, res) => {
  const user = sanitizeUser(BACKEND_USERS[1]);
  const orders = BACKEND_ORDERS.filter(o => o.userId === 1);
  const summary = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    lowStockProducts: BACKEND_PRODUCTS.filter(p => p.stock < 10).length,
  };
  res.json({ user, orders, products: BACKEND_PRODUCTS, summary });
});

// --- BFF: Transformación de datos (el BFF adapta al formato que Angular necesita) ---
app.get('/api/bff/products', rateLimit(30, 60000), authCheck, (req, res) => {
  // Los backends internos pueden devolver datos complejos;
  // el BFF transforma a un formato simple para el frontend
  const transformed = BACKEND_PRODUCTS.map(p => ({
    id: p.id,
    label: p.name,
    priceFormatted: `$${p.price.toFixed(2)}`,
    available: p.stock > 0,
  }));
  res.json(transformed);
});

// --- DEMO: Endpoints "sin BFF" (simulan llamadas directas al backend) ---
app.get('/api/bff/raw/users', (req, res) => {
  // Sin BFF: devuelve datos crudos con datos sensibles expuestos
  res.json(Object.values(BACKEND_USERS));
});

app.get('/api/bff/raw/orders', (req, res) => {
  res.json(BACKEND_ORDERS);
});

app.get('/api/bff/raw/products', (req, res) => {
  res.json(BACKEND_PRODUCTS);
});

// --- BFF: Proxy a backends externos (ej: GitHub API) ---
app.get('/api/bff/github/repos', rateLimit(5, 60000), authCheck, async (req, res) => {
  // El BFF usa el token guardado (nunca expuesto al frontend)
  // para llamar a APIs externas en nombre del usuario
  const githubToken = req.session.githubToken;
  try {
    const response = await fetch('https://api.github.com/user/repos', {
      headers: { Authorization: `Bearer ${githubToken}`, Accept: 'application/vnd.github.v3+json' },
    });
    const repos = await response.json();
    // Transforma: solo devuelve lo que Angular necesita
    const safeRepos = repos.map(r => ({ id: r.id, name: r.name, private: r.private, url: r.html_url }));
    res.json(safeRepos);
  } catch (err) {
    res.status(502).json({ error: 'Error contacting GitHub' });
  }
});

app.listen(PORT, () => console.log(`BFF server running on http://localhost:${PORT}`));
