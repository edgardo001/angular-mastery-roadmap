## 47 ÔÇö Backend for Frontend (BFF)

Patr├│n BFF con Express/FastAPI/Spring Boot: backend espec├¡fico para el frontend Angular, agregaci├│n de APIs y seguridad.

> **Prop├│sito:** Implementar el patr├│n Backend-for-Frontend (BFF) con Node.js/Express: agregaci├│n de APIs, sanitizaci├│n de datos, autenticaci├│n delegada y tipos compartidos con Angular.
>
> **Problema que resuelve:** El frontend no deber├¡a llamar directamente a m├║ltiples microservicios (latencias, datos sensibles, versionado de APIs); sin BFF cada cambio de backend requiere cambio frontend.
>
> **C├│mo lo resuelve:** BFF con Express que agrega datos de m├║ltiples backends, sanitiza lo que env├¡a al frontend, maneja autenticaci├│n y comparte tipos TypeScript con Angular.
>
> **Por qu├® aprenderlo:** BFF es el patr├│n recomendado por arquitectos para desacoplar frontend de backends; adoptado por Netflix, SoundCloud y ThoughtWorks.

### Conceptos Clave

- **BFF**: backend intermedio entre Angular y servicios internos
- **Express BFF**: proxy inverso, agregaci├│n de m├║ltiples APIs
- **FastAPI BFF**: Python as├¡ncrono, agregaci├│n y transformaci├│n
- **Spring Boot BFF**: ruteo, filtrado, rate limiting
- **Rate Limiting**: `express-rate-limit`, protecci├│n contra abusos
- **Agregaci├│n**: combinar respuestas de m├║ltiples servicios
- **Transformaci├│n**: adaptar datos al formato que necesita Angular
- **Auth delegation**: sesi├│n en BFF, tokens gestionados en servidor
- **Caching**: respuestas cacheadas en BFF para reducir latencia

### Proyecto

BFF con Express/FastAPI que agrega datos de 3 APIs externas, implementa rate limiting y caching, y sirve a Angular.

### Ejercicios

1. Configura Express como BFF con rutas para Angular
2. Implementa rate limiting en rutas sensibles
3. Agrega datos de 3 APIs en un solo endpoint BFF
4. Transforma datos al formato esperado por Angular
5. Implementa caching con Redis o en memoria

### C├│mo ejecutar

```bash
cd 47-bff
npm install
npm run dev:all
```
