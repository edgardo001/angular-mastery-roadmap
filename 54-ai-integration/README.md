## 54 — Integración con IA / LLMs

Integración de modelos de lenguaje (LLMs) en Angular: backend proxy seguro, streaming SSE, manejo de tokens, y componentes de chat interactivos.

> **Propósito:** Integrar APIs de IA generativa con Angular usando un backend proxy seguro: streaming de respuestas (Server-Sent Events), manejo de tokens, historial conversacional con signals, y componentes de chat.
>
> **Problema que resuelve:** Enviar la API key de OpenAI desde el navegador es inseguro: cualquiera que inspeccione la red puede verla, robarla y usarla a tu costa. Las APIs de IA son asíncronas, requieren streaming y manejo de tokens.
>
> **Cómo lo resuelve:** Un backend proxy Express.js se queda entre Angular y OpenAI. La API key vive exclusivamente en el servidor (archivo .env). El navegador solo se comunica con localhost:3000, nunca con OpenAI directamente. Streaming con SSE a través del proxy.
>
> **Por qué aprenderlo:** La IA generativa es la tecnología más transformadora del momento. Un proxy seguro es un patrón empresarial estándar para proteger credenciales y controlar el acceso a APIs de terceros.

### Seguridad: Por qué un Backend Proxy

```
ANTES (INSEGURO):
┌──────────┐     Authorization: Bearer sk-...     ┌──────────┐
│ Browser  │ ─────────────────────────────────────► │ OpenAI   │
│ Angular  │   ▲ ¡API key visible en la red!       │   API    │
└──────────┘                                          └──────────┘

AHORA (SEGURO):
┌──────────┐  POST /api/chat  ┌──────────────┐  Authorization  ┌──────────┐
│ Browser  │ ────────────────► │ Proxy Server │ ──────────────► │ OpenAI   │
│ Angular  │  (sin API key)   │  Express.js  │  Bearer sk-...  │   API    │
└──────────┘                  └──────────────┘                  └──────────┘
                              ▲ La API key NUNCA                  ▲
                                sale del servidor                    La API key
                                                                     es segura
```

### Conceptos Clave

- **Backend Proxy**: servidor intermedio que protege credenciales de APIs
- **Variables de entorno (.env)**: almacenan secretos fuera del código fuente
- **Server-Sent Events (SSE)**: streaming de servidor a cliente vía HTTP
- **CORS**: control de acceso cross-origin entre Angular y el proxy
- **API Key Management**: gestión segura de credenciales en el servidor
- **Streaming**: respuesta de IA que llega poco a poco, no toda de golpe
- **Prompt Engineering**: system prompts, few-shot, templates
- **Rate Limiting**: control de uso por usuario
- **RAG (Retrieval-Augmented Generation)**: búsqueda semántica + contexto
- **BFF (Backend for Frontend)**: backend que orquesta RAG + LLM + contexto

### Proyecto

Chatbot IA con streaming seguro a través de backend proxy Express. La API key nunca llega al navegador.

### Ejercicios

1. Ejecuta el proxy y verifica `/api/health` con curl
2. Implementa rate limiting en el proxy (máximo 10 requests/min)
3. Agrega autenticación de usuario al proxy (JWT tokens)
4. Implementa caché de respuestas frecuentes en el servidor
5. Agrega logging de requests en el proxy para auditoría

### Cómo ejecutar

```bash
cd 54-ai-integration

# 1. Configurar la API key en el servidor
cd server
cp .env.example .env
# Editar .env y agregar tu API key de OpenAI
cd ..

# 2. Instalar dependencias e iniciar todo
npm install
npm start
# Esto inicia tanto el proxy (puerto 3000) como Angular (puerto 8080)
```

### Conceptos de Seguridad

| Concepto | Qué es | Analogía |
|----------|--------|----------|
| **Backend Proxy** | Servidor intermediario que protege credenciales | Un traductor que nunca revela los secretos de un lado al otro |
| **Variables de entorno** | Archivo `.env` que almacena secretos fuera del código | Una caja fuerte: el contenido es visible solo para el servidor |
| **Nunca exponer API keys** | La clave nunca sale del servidor | Tu PIN del cajero automático: nadie lo ve mientras lo escribes |
| **CORS** | Control de acceso entre dominios | Un portero que decide quién puede entrar al edificio |
| **Server-Sent Events** | Streaming unidireccional del servidor al cliente | Como una llamada telefónica donde solo uno habla y el otro escucha |

### Archivos del Proyecto

| Archivo | Carpeta | Propósito |
|---------|---------|-----------|
| `README.md` | Raíz | Documentación del proyecto |
| `angular.json` | Raíz | Configuración del workspace Angular |
| `package.json` | Raíz | Dependencias y scripts del proyecto |
| `proxy.conf.json` | Raíz | Configuración de proxy de Angular → Express |
| `tsconfig.json` | Raíz | Configuración base de TypeScript |
| `tsconfig.app.json` | Raíz | Configuración de TypeScript para la app |
| `tsconfig.spec.json` | Raíz | Configuración de TypeScript para tests |
| `package-lock.json` | Raíz | Bloqueo de versiones de dependencias |
| `src/index.html` | `src/` | HTML principal de la aplicación |
| `src/main.ts` | `src/` | Punto de entrada de la aplicación |
| `src/styles.css` | `src/` | Estilos globales |
| `src/app/app.config.ts` | `src/app/` | Configuración de providers de Angular |
| `src/app/app.ts` | `src/app/` | Componente raíz de la aplicación |
| `src/app/app.routes.ts` | `src/app/` | Configuración de rutas |
| `src/app/ai.service.ts` | `src/app/` | Servicio de integración con proxy de IA |
| `src/app/chat.service.ts` | `src/app/` | Servicio de chat con streaming SSE |
| `src/app/chat.ts` | `src/app/` | Componente de chat interactivo con IA |
| `server/package.json` | `server/` | Dependencias del servidor proxy |
| `server/server.js` | `server/` | Servidor proxy Express con streaming |
| `server/.env.example` | `server/` | Plantilla de variables de entorno |
| `server/.env` | `server/` | Variables de entorno (NO subir a Git) |
