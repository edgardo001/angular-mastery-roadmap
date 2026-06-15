## 41 ÔÇö Observabilidad (Observability)

Monitoreo y observabilidad en Angular: Sentry, OpenTelemetry, Web Vitals, logs estructurados y trazabilidad.

> **Prop├│sito:** Implementar observabilidad completa en Angular: Sentry para errores, OpenTelemetry para trazas, Web Vitals para m├®tricas reales de usuario y logging estructurado.
>
> **Problema que resuelve:** Sin observabilidad, los errores en producci├│n son invisibles, no sabes c├│mo rinden tus p├íginas para usuarios reales y debugging es como buscar una aguja en un pajar.
>
> **C├│mo lo resuelve:** Sentry captura errores con stack traces y contexto, OpenTelemetry traza peticiones completas frontendÔåÆbackend, Web Vitals mide LCP/CLS/INP reales, y ErrorHandler personalizado captura errores globales.
>
> **Por qu├® aprenderlo:** La observabilidad distingue equipos profesionales de aficionados; sin ella no puedes mejorar lo que no mides y los errores en producci├│n te son desconocidos.

### Conceptos Clave

- **Sentry**: `@sentry/angular`, `TraceService`, capture exceptions, performance
- **OpenTelemetry**: `@opentelemetry/instrumentation-angular`, trazas distribuidas
- **Web Vitals**: `web-vitals` library, LCP, FID, CLS, INP
- **Error handling global**: `ErrorHandler` personalizado, `HttpErrorResponse`
- **Logging**: `Logger` service con niveles (debug, info, warn, error)
- **Correlation ID**: `HttpContext` token para trazar peticiones
- **Trazas distribuidas**: OpenTelemetry + backend (Spring Boot/.NET/FastAPI)
- **RUM (Real User Monitoring)**: m├®tricas reales de usuario
- **Dashboard**: monitoreo centralizado en Sentry/Grafana

### Proyecto

Configuraci├│n completa de observabilidad: Sentry + Web Vitals + OpenTelemetry + ErrorHandler personalizado en Angular.

### Ejercicios

1. Integra Sentry con `@sentry/angular`
2. Captura errores globales con `ErrorHandler`
3. Mide Core Web Vitals (LCP, CLS, INP)
4. Configura OpenTelemetry tracing
5. Implementa Correlation ID en interceptores HTTP

### C├│mo ejecutar

```bash
cd 41-observability
npm install
ng serve
```
