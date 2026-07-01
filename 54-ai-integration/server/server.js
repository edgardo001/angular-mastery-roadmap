// ============================================================
// server.js — Backend proxy seguro para OpenAI API
// ============================================================
// PROPÓSITO DE SEGURIDAD:
// En la versión anterior, la API key de OpenAI se enviaba desde el
// navegador directamente. Esto es PELIGROSO porque:
//
//   1. Cualquiera que inspeccione la red puede VER la API key
//   2. La API key queda en el historial del navegador
//   3. Cualquier usuario podría usarla para hacer requests a OpenAI
//      a costa de tu cuenta
//
// SOLUCIÓN: Este servidor proxy se queda entre Angular y OpenAI.
// El navegador NUNCA ve la API key — vive únicamente en el servidor.
//
// ANATOMÍA DE UN PROXY SEGURO:
//
//   ┌──────────┐      POST /api/chat       ┌──────────────┐
//   │ Browser  │ ────────────────────────►  │ Proxy Server │
//   │ Angular  │      (sin API key)        │  Express.js  │
//   └──────────┘                           └──────┬───────┘
//                                                 │
//                                        Agrega Authorization header
//                                        con la API key del .env
//                                                 │
//                                                 ▼
//                                        ┌────────────────┐
//                                        │   OpenAI API   │
//                                        └────────────────┘
//
// Es como un traductor que habla con ambos lados pero nunca
// revela los secretos de un lado al otro.

// ============================================================
// 1. IMPORTACIONES
// ============================================================
// Express: framework web minimalista para Node.js
// Es como un "caminador de rutas": recibe peticiones HTTP y las
// dirige al lugar correcto.
const express = require('express');

// CORS: Cross-Origin Resource Sharing
// Permite que tu app Angular (puerto 4200) hable con este servidor
// (puerto 3000). Sin CORS, el navegador bloquearía las peticiones.
const cors = require('cors');

// fs (filesystem): módulo nativo de Node para leer archivos
// Lo usamos para cargar variables de entorno desde un archivo .env
const fs = require('fs');
const path = require('path');

// ============================================================
// 2. CARGA DE VARIABLES DE ENTORNO (.env)
// ============================================================
// Un archivo .env contiene secretos como API keys.
// NUNCA lo subas a Git (agrega .env a .gitignore).
//
// Es como una caja fuerte: el contenido es visible solo para
// el servidor, nunca para el navegador.
function loadEnvFile() {
  const envPath = path.join(__dirname, '.env');
  try {
    // fs.readFileSync lee el archivo completo de forma síncrona
    const content = fs.readFileSync(envPath, 'utf-8');
    // Procesa cada línea que contiene KEY=VALUE
    for (const line of content.split('\n')) {
      // Ignora comentarios (líneas que empiezan con #) y líneas vacías
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      // Divide la línea en clave y valor usando el primer '='
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      const value = trimmed.slice(eqIndex + 1).trim();
      // process.env es donde Node.js almacena las variables de entorno
      // El operador ||=: solo asigna si la variable NO existe ya
      process.env[key] = process.env[key] || value;
    }
  } catch {
    // Si no existe .env, es normal — usará variables del sistema
  }
}

// Carga las variables de entorno antes de usarlas
loadEnvFile();

// ============================================================
// 3. CONFIGURACIÓN DEL SERVIDOR
// ============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================
// 4. MIDDLEWARE (procesadores intermedios)
// ============================================================
// Middleware es como una "estación de inspección": cada petición
// HTTP pasa por ellos antes de llegar al endpoint final.

// cors(): habilita CORS para todas las rutas
// En producción, podrías restringir a dominios específicos:
//   cors({ origin: 'https://tu-dominio.com' })
app.use(cors());

// express.json(): parsea el body de peticiones con Content-Type: application/json
// Sin esto, req.body sería undefined.
app.use(express.json());

// ============================================================
// 5. ENDPOINTS DE LA API
// ============================================================

// GET /api/health — Verificación de salud del servidor
// Los clientes lo llaman para confirmar que el proxy está corriendo.
app.get('/api/health', (req, res) => {
  // La respuesta indica que el servidor funciona y la API key está configurada
  // NOTA: Nunca enviamos el valor real de la API key al cliente
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasApiKey: !!process.env.OPENAI_API_KEY
  });
});

// POST /api/chat — Endpoint principal de chat con streaming
// Recibe mensajes del navegador y los reenvía a OpenAI con la API key.
//
// FLUJO DE SEGURIDAD:
//   1. El navegador envía SOLO los messages (sin API key)
//   2. El servidor AGREGA la API key desde process.env
//   3. El servidor reenvía a OpenAI
//   4. OpenAI responde con streaming (chunks de texto)
//   5. El servidor REENVÍA el streaming al navegador
//
// Es como un correo postal: el remitente (browser) pone el mensaje,
// el cartero (proxy) agrega el sello (API key) y lo entrega.
app.post('/api/chat', async (req, res) => {
  // --- VALIDACIÓN BÁSICA ---
  // Verifica que la API key esté configurada en el servidor
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: 'OPENAI_API_KEY not configured on server',
      message: 'Please set the API key in the server .env file'
    });
  }

  // --- VALIDACIÓN DEL REQUEST ---
  // Verifica que el body tenga los campos requeridos
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Body must contain a "messages" array'
    });
  }

  try {
    // --- CONEXIÓN CON OPENAI ---
    // Prepara el request para la API de OpenAI
    const openaiPayload = {
      model: req.body.model || 'gpt-4o',
      messages: messages,
      stream: true  // Activa streaming: la respuesta llega en chunks
    };

    // Realiza la petición a OpenAI
    // CRÍTICO: La API key se toma de process.env, NUNCA del request
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Esta línea es la clave de seguridad:
        // La API key viene del .env del servidor, no del navegador
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(openaiPayload)
    });

    // --- MANEJO DE ERRORES DE OPENAI ---
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`OpenAI API error ${response.status}:`, errorText);
      return res.status(response.status).json({
        error: `OpenAI API error: ${response.status}`,
        details: errorText
      });
    }

    // --- STREAMING AL NAVEGADOR ---
    // Configura los headers para Server-Sent Events (SSE)
    // Estos headers le dicen al navegador: "esto es un stream, no una respuesta normal"
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    // Evita que proxies intermedios (nginx, etc.) guarden la respuesta
    res.setHeader('X-Accel-Buffering', 'no');

    // Crea un reader para leer el stream de OpenAI
    // response.body es un ReadableStream (stream binario)
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    // Lee y reenvía cada chunk del streaming
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Convierte bytes a texto y reenvía al navegador
      // res.write() envía datos parciales sin cerrar la conexión
      const chunk = decoder.decode(value, { stream: true });
      res.write(chunk);
    }

    // Termina el stream enviando el evento de finalización estándar
    res.write('data: [DONE]\n\n');
    res.end();

  } catch (error) {
    // Error de red o de configuración (no de OpenAI)
    console.error('Proxy error:', error);
    // Solo enviamos el mensaje de error, NUNCA detalles internos
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// ============================================================
// 6. INICIO DEL SERVIDOR
// ============================================================
app.listen(PORT, () => {
  console.log(`\n🔒 AI Proxy Server running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Chat endpoint: POST http://localhost:${PORT}/api/chat`);

  // Verifica al iniciar si la API key está configurada
  if (process.env.OPENAI_API_KEY) {
    console.log(`   ✅ OPENAI_API_KEY is configured`);
  } else {
    console.log(`   ⚠️  OPENAI_API_KEY not found! Create a .env file in server/`);
  }
  console.log('');
});
