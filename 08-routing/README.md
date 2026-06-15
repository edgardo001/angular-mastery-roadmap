## 08 — Routing y Navegación

Angular Router: lazy loading, guards funcionales, data resolvers, nested routes y `@let` en templates.

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
