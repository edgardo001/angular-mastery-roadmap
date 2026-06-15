## 54 ÔÇö Integraci├│n con IA / LLMs

Integraci├│n de modelos de lenguaje (LLMs) en Angular: OpenAI, Claude, Gemini, streaming SSE, RAG, y prompt engineering.

> **Prop├│sito:** Integrar APIs de IA generativa con Angular: streaming de respuestas (Server-Sent Events), manejo de tokens, carga de documentos, y componentes de chat interactivos.
>
> **Problema que resuelve:** Las APIs de IA (OpenAI, Anthropic) son as├¡ncronas, requieren manejo de streaming, tokens limitados y estado conversacional; integrarlas mal da UX pobre.
>
> **C├│mo lo resuelve:** SSE para streaming de respuestas con fetch + ReadableStream, manejo de tokens con contador, historial conversacional con signals, y componentes de chat tipados.
>
> **Por qu├® aprenderlo:** La IA generativa es la tecnolog├¡a m├ís transformadora del momento; integrarla en Angular abre posibilidades de productos inteligentes con chat, an├ílisis y automatizaci├│n.

### Conceptos Clave

- **LLM APIs**: OpenAI (`gpt-4o`), Claude (`claude-sonnet`), Gemini
- **Streaming SSE**: `EventSource`, fetch con `ReadableStream`, se├▒ales para chunks
- **RAG (Retrieval-Augmented Generation)**: b├║squeda sem├íntica + contexto
- **Embeddings**: `text-embedding-3-small`, vector search
- **Prompt Engineering**: system prompts, few-shot, templates
- **Backend proxy**: Express/FastAPI como proxy para LLM (protege API keys)
- **WebSocket streaming**: streaming via WebSocket para respuesta continua
- **Rate limiting**: control de tokens, l├¡mites por usuario
- **BFF para IA**: backend que orquesta RAG + LLM + contexto

### Proyecto

Chatbot IA con streaming, RAG sobre documentaci├│n, y selecci├│n de modelo. Backend proxy Express/FastAPI.

### Ejercicios

1. Crea chat con streaming SSE y se├▒ales
2. Implementa backend proxy Express para OpenAI
3. A├▒ade RAG: embeddings + b├║squeda sem├íntica
4. Implementa selector de modelo (GPT-4o, Claude)
5. Agrega rate limiting por usuario

### C├│mo ejecutar

```bash
cd 54-ai-integration
npm install
npm run dev:all
```
