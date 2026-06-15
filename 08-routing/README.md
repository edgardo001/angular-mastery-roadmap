## 08 — Routing y Navegación

Angular Router: lazy loading, guards funcionales, data resolvers, nested routes y `@let` en templates.

> **Propósito:** Configurar navegación SPA con lazy loading, guards funcionales, resolvers y view transitions para apps multi-página eficientes.
>
> **Problema que resuelve:** Las SPAs sin router tienen URLs no compartibles, carga total en cada navegación y falta de control de acceso lateral.
>
> **Cómo lo resuelve:** Angular Router proporciona lazy loading (carga bajo demanda), guards funcionales (canActivate, canMatch), resolvers para datos previos y view transitions nativas.
>
> **Por qué aprenderlo:** El router es la columna vertebral de toda SPA; sin él no hay navegación, ni lazy loading, ni protección de rutas.

### Conceptos Clave

- **Router**: `provideRouter`, `withComponentInputBinding`, `withViewTransitions`
- **Rutas**: `Routes`, `path`, `component`, `loadComponent`, `loadChildren`
- **Lazy Loading**: `loadComponent` para standalone, `loadChildren` para rutas hijas
- **Guards funcionales**: `canActivateFn`, `canMatchFn`, `canDeactivateFn`, `canActivateChildFn`
- **Resolvers**: `ResolveFn`, datos antes de navegar
- **RouterLink**: `[routerLink]`, `routerLinkActive`, `queryParams`
- **Parámetros**: `@Input()` binding con `withComponentInputBinding()`, `params`, `queryParams`
- **View Transitions**: navegación con transiciones animadas nativas
- **`@let`**: variables reactivas en templates

### Proyecto

App multi-página con lazy loading: Home, Productos (con detalle), Auth (login/register), Dashboard protegido.

### Ejercicios

1. Configura rutas con `provideRouter` y lazy loading
2. Implementa `canActivateFn` para proteger rutas
3. Usa `canMatchFn` para redirigir según rol
4. Activa `withComponentInputBinding` y recibe params como input
5. Añade `withViewTransitions` para transiciones suaves

### Cómo ejecutar

```bash
cd 08-routing
npm install
ng serve
```
