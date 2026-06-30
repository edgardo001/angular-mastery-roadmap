## 12 — HttpClient e Interceptors

Comunicación HTTP con Angular: `HttpClient`, interceptores funcionales, `HttpContext`, y manejo de errores.

> **Propósito:** Configurar HttpClient con interceptores funcionales, HttpContextToken, retry automático y manejo global de errores HTTP.
>
> **Problema que resuelve:** Llamadas HTTP sin una capa centralizada resultan en código repetitivo, error handling inconsistente y nula trazabilidad de peticiones.
>
> **Cómo lo resuelve:** HttpClient con interceptores funcionales (log, retry, auth), HttpContextToken para metadatos por petición, y manejo unificado de errores en el pipe RxJS.
>
> **Por qué aprenderlo:** Toda app Angular se comunica con un backend; HttpClient e interceptores son la capa de comunicación estándar y extensible.


```mermaid
flowchart LR
    CMP["Componente"] --> SVC["Servicio"]
    SVC --> HTTP["HttpClient"]
    HTTP --> INT1["Interceptor (auth)"]
    INT1 --> API["API REST"]
    API --> INT2["Interceptor (error)"]
    INT2 --> SVC
    SVC --> CMP
```

### Conceptos Clave

- **`HttpClient`**: servicio para peticiones HTTP, tipado genérico
- **`provideHttpClient()`**: configuración con `withFetch`, `withInterceptors`
- **Interceptores funcionales**: `HttpInterceptorFn`, `next(req).pipe()`
- **HttpContext**: tokens de contexto para interceptores
- **`HttpParams`**: query params tipados
- **`HttpHeaders`**: headers personalizados
- **`HttpEvent`**: eventos del ciclo de vida (sent, response, upload progress)
- **`HttpProgressEvent`**: progreso de subida/descarga
- **Manejo de errores**: `catchError`, retry, error handling unificado
- **`@angular/common/http`**: `HttpErrorResponse`, `HttpStatusCode`

### Proyecto

API Client para un CRUD de productos con interceptors: logging, auth token, error handling, retry.

### Ejercicios

1. Configura `provideHttpClient` con `withFetch` y `withInterceptors`
2. Implementa un interceptor funcional para logs de petición
3. Añade interceptor de autenticación (Bearer token)
4. Crea un interceptor de error handling con retry
5. Usa `HttpContext` para pasar metadatos a interceptores

### Cómo ejecutar

```bash
cd 12-http-client
npm install
ng serve --host 0.0.0.0 --port 8080
```

### Archivos del Proyecto

| Archivo | Propósito | Ruta |
|---------|-----------|------|
| `angular.json` | Configuración del proyecto Angular | `angular.json` |
| `package.json` | Dependencias y scripts del proyecto | `package.json` |
| `tsconfig.json` | Configuración base de TypeScript | `tsconfig.json` |
| `tsconfig.app.json` | Configuración TypeScript de la aplicación | `tsconfig.app.json` |
| `src/index.html` | Punto de entrada HTML de la aplicación | `src/index.html` |
| `src/main.ts` | Punto de entrada principal de Angular | `src/main.ts` |
| `src/styles.css` | Estilos globales de la aplicación | `src/styles.css` |
| `src/app/app.config.ts` | Configuración de providers con HttpClient | `src/app/app.config.ts` |
| `src/app/app.component.ts` | Componente raíz de la aplicación | `src/app/app.component.ts` |
| `src/app/services/product.service.ts` | Servicio CRUD de productos con HttpClient | `src/app/services/product.service.ts` |
| `src/app/interceptors/auth.interceptor.ts` | Interceptor funcional para token Bearer | `src/app/interceptors/auth.interceptor.ts` |
| `src/app/interceptors/error.interceptor.ts` | Interceptor funcional para manejo global de errores | `src/app/interceptors/error.interceptor.ts` |
| `src/app/interceptors/logging.interceptor.ts` | Interceptor funcional para logging de peticiones | `src/app/interceptors/logging.interceptor.ts` |
| `src/app/interceptors/skip-auth.context.ts` | Token HttpContext para saltar autenticación | `src/app/interceptors/skip-auth.context.ts` |
