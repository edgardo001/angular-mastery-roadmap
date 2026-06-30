## 25 — Angular SSR (Server-Side Rendering)

Renderizado del lado del servidor con Angular: Hydration, Server Routes, prerendering, y streaming.

> **Propósito:** Implementar Server-Side Rendering con Angular: hydration, prerendering, streaming, meta tags SEO y optimización de Core Web Vitals.
>
> **Problema que resuelve:** Las SPAs tradicionales tienen mal SEO (los crawlers ven HTML vacío), primer paint lento (todo JS debe cargarse) y mala experiencia en redes lentas.
>
> **Cómo lo resuelve:** SSR renderiza HTML completo en servidor (mejor SEO/LCP), hydration añade interactividad sin recargar, prerendering genera páginas estáticas, streaming envía contenido progresivo.
>
> **Por qué aprenderlo:** SSR es crítico para SEO, Core Web Vitals y UX; Google penaliza SPAs lentas. Angular SSR con hydration parcial es la solución más avanzada del ecosistema.


```mermaid
flowchart LR
    REQ["Request"] --> SRV["Angular SSR Server"]
    SRV --> RENDER["Renderiza HTML"]
    RENDER --> HTML["HTML pre-renderizado"]
    HTML --> BROWSER["Navegador (HTML inmediato)"]
    BROWSER --> HYDRATE["Hydration"]
    HYDRATE --> SPA["SPA interactivo"]
```

### Conceptos Clave

- **`@angular/ssr`**: configuración SSR, `provideServerRendering`
- **Hydration**: `provideClientHydration()`, hidratación progresiva
- **Server Routes**: rutas que solo se ejecutan en servidor
- **Prerendering (SSG)**: `renderRoute`, generación estática en build
- **Streaming**: renderizado progresivo con `@defer` y SSR
- **`provideServerRoutesConfig`**: configuración de rutas servidor
- **`AngularUniversalEngine`**: Express engine para SSR
- **Meta Tags y SEO**: `Meta` service, `Title` service, Open Graph
- **Incremental Static Regeneration (ISR)**: recarga de rutas prerenderedas

### Proyecto

Blog con SSR + Hydration, prerendering para páginas estáticas, y streaming para secciones dinámicas.

### Ejercicios

1. Configura SSR con `ng add @angular/ssr`
2. Implementa hydratación con `provideClientHydration`
3. Crea Server Route para datos sensibles (solo server)
4. Configura prerendering para páginas estáticas
5. Implementa meta tags dinámicos para SEO

### Cómo ejecutar

```bash
cd 25-angular-ssr
npm install
ng serve --host 0.0.0.0 --port 8080
```
