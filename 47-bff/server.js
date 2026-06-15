const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

const authCheck = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token !== 'Bearer valid-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

const mockUsers = { 1: { id: 1, name: 'Alice García', email: 'alice@example.com', role: 'admin', ssn: '***-**-1234' } };
const mockOrders = [
  { id: 101, userId: 1, product: 'Laptop', quantity: 1, total: 1500, status: 'shipped' },
  { id: 102, userId: 1, product: 'Mouse', quantity: 2, total: 80, status: 'pending' },
];
const mockProducts = [
  { id: 1, name: 'Laptop', price: 1500, stock: 5, category: 'electronics' },
  { id: 2, name: 'Mouse', price: 40, stock: 20, category: 'accessories' },
  { id: 3, name: 'Keyboard', price: 100, stock: 2, category: 'accessories' },
];

const sanitizeUser = (user) => {
  const { ssn, ...safe } = user;
  return safe;
};

app.get('/api/bff/dashboard', authCheck, (req, res) => {
  const user = sanitizeUser(mockUsers[1]);
  const orders = mockOrders.filter(o => o.userId === 1);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStockProducts = mockProducts.filter(p => p.stock < 10).length;

  res.json({
    user,
    orders,
    products: mockProducts,
    summary: { totalOrders: orders.length, totalRevenue, lowStockProducts },
  });
});

app.listen(PORT, () => console.log(`BFF server running on http://localhost:${PORT}`));
