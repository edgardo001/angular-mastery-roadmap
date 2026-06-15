# Angular Mastery Roadmap

Ruta completa para aprender **Angular v22+** desde los fundamentos hasta arquitecturas empresariales (58 módulos). Cada concepto tiene su propia carpeta con teoría, ejemplos y ejercicios.

## Requisitos

- Node.js 22+ y npm/yarn/pnpm
- Conocimientos básicos de HTML, CSS y JavaScript/TypeScript
- VS Code (recomendado)

## Estructura del Curso

```
angular/
├── 01-fundamentos-ts/          # TypeScript moderno para Angular
├── 02-intro-angular/           # Introducción a Angular CLI y componentes
├── 03-componentes-input/       # Componentes, @Input, @Output, señales input/output
├── 04-estados-eventos/         # Signals, eventos, two-way binding
├── 05-control-flow/            # @if, @for, @switch (nuevo control flow)
├── 06-ciclo-vida/              # ngAfterViewInit, effect, afterNextRender
├── 07-formularios/             # Reactive Forms, validación, FormArray
├── 08-routing/                 # Router, guards, lazy loading
├── 09-dependency-injection/    # DI, providers, injection tokens
├── 10-servicios/               # Servicios, RxJS, señales en servicios
├── 11-signals-estado/          # Signals, computed, state management
├── 12-http-client/             # HttpClient, interceptors, RxJS
├── 13-login-basico/            # Login con servicios + localStorage
├── 14-login-jwt/               # JWT con interceptors y guards
├── 15-cookie-auth/             # HttpOnly cookies, XSRF/CSRF
├── 16-tabla-maestra/           # Tabla: sorting, paginación, búsqueda
├── 17-servir-express/          # Servir Angular con Express
├── 18-pruebas-unitarias/       # Jasmine + Karma / Jest + Testing Library
├── 19-render-performance/      # OnPush, @defer, signals, ChangeDetection
├── 20-angular-query/           # TanStack Query Angular (server state)
├── 21-estado-global/           # NGXS / NgRx Signals / NGSS
├── 22-typescript-avanzado/     # TypeScript avanzado para Angular
├── 23-arquitectura/            # Arquitectura limpia empresarial
├── 24-docker-despliegue/       # Docker, CI/CD, deploy producción
├── 25-angular-ssr/             # Angular SSR, Hydration, Server Routes
├── 26-tailwind-css/            # Tailwind CSS con Angular
├── 27-e2e-playwright/          # E2E testing con Playwright
├── 28-animaciones/             # Angular Animations (state, stagger, keyframes)
├── 29-i18n/                    # Angular i18n, @angular/localize
├── 30-storybook/               # Catálogo de componentes con Storybook
├── 31-monorepo/                # Monorepos con Nx
├── 32-websockets/              # Tiempo real con RxJS WebSocket + Socket.io
├── 33-accesibilidad/           # WCAG, ARIA, a11y directives
├── 34-arquitectura-hexagonal/  # Puertos y Adaptadores
├── 35-monolito-modular/        # Módulos independientes
├── 36-event-driven/            # RxJS Event Bus, SAGA
├── 37-microfrontends/          # Module Federation con Angular
├── 38-ddd/                     # Domain-Driven Design
├── 39-springboot-jwt/          # Spring Boot 4.1.0 + JWT + Angular (integrado o separado)
├── 40-fastapi-jwt/             # Python FastAPI + JWT + Angular (integrado o separado)
├── 40-dotnet-jwt/              # .NET 10 + JWT + Angular (integrado o separado)
├── 41-observability/           # Sentry, OpenTelemetry, Angular tracing
├── 42-feature-flags/           # Feature flags, releases graduales
├── 43-oauth/                   # OAuth 2.0, angular-oauth2-oidc, Auth0
├── 44-graphql/                 # Apollo Angular, GraphQL
├── 45-seguridad/               # OWASP, CSP, Angular security, DOM sanitization
├── 46-design-system/           # Angular CDK + Material Design System
├── 47-bff/                     # Backend for Frontend con Express
├── 48-pwa/                     # PWA, Angular Service Worker, push
├── 49-state-machines/          # XState + Angular, state machines
├── 50-data-viz/                # D3.js, ngx-charts, Chart.js
├── 51-server/                  # Angular + Express + Prisma (full-stack)
├── 52-ci-cd-avanzado/          # CI/CD avanzado, blue/green, canary
├── 53-ionic/                   # Ionic + Capacitor (mobile con Angular)
├── 54-ai-integration/          # LLMs, OpenAI, streaming SSE, RAG
├── 55-real-time-collab/        # Y.js, CRDTs, edición colaborativa
├── 56-rendimiento-avanzado/    # $effect, afterRender, SSR streaming, isr
├── 57-threejs/                 # 3D con Three.js + Angular
└── README.md
```

## Nivel 1 — Fundamentos (Días 1–7)

| # | Carpeta | Tema |
|---|---------|------|
| 1 | `01-fundamentos-ts` | Tipos básicos, interfaces, genéricos, union types, utility types, async/await |
| 2 | `02-intro-angular` | Angular CLI, componentes standalone, templates, interpolación |
| 3 | `03-componentes-input` | `@Input`, `@Output`, `input()` signal, `output()`, `model()`, `contentChild` |
| 4 | `04-estados-eventos` | `signal()`, `set`/`update`, eventos DOM, two-way binding, `[(ngModel)]` |
| 5 | `05-control-flow` | `@if`, `@for` (`track`), `@switch`, `@empty`, nuevo control flow |
| 6 | `06-ciclo-vida` | `ngOnInit`, `ngAfterViewInit`, `effect()`, `afterNextRender()`, `afterRender()` |
| 7 | `07-formularios` | Reactive Forms, FormGroup, FormControl, FormArray, validadores, FormRecord |

## Nivel 2 — Intermedio (Días 8–15)

| # | Carpeta | Tema |
|---|---------|------|
| 8 | `08-routing` | Router, `routes`, `canActivate`, `canMatch`, `canDeactivate`, lazy loading, `@let` |
| 9 | `09-dependency-injection` | DI jerárquica, `providedIn`, `InjectionToken`, `@Injectable`, `inject()` |
| 10 | `10-servicios` | Servicios con signals, RxJS Subjects, `BehaviorSubject`, `toSignal`, `toObservable` |
| 11 | `11-signals-estado` | `computed()`, `effect()`, `untracked()`, linkedSignal, estado local con signals |
| 12 | `12-http-client` | `HttpClient`, interceptors funcionales, `HttpContext`, `HttpEvent`, RxJS operadores |
| 13 | `13-login-basico` | Login con servicio + localStorage, ruta protegida, AuthGuard |
| 14 | `14-login-jwt` | JWT: access + refresh token, interceptor, `canActivateFn` |
| 15 | `15-cookie-auth` | Cookies HttpOnly, SameSite, `HttpXsrfInterceptor`, refresh silencioso |

## Nivel 3 — Avanzado / Empresarial (Días 16–24)

| # | Carpeta | Tema |
|---|---------|------|
| 16 | `16-tabla-maestra` | Tabla: búsqueda, ordenamiento, paginación, Angular CDK Table |
| 17 | `17-servir-express` | Express SSR, API proxy, variables de entorno, `server.ts` |
| 18 | `18-pruebas-unitarias` | TestBed, `HttpClientTestingController`, `componentFixture`, mocks, jest |
| 19 | `19-render-performance` | `ChangeDetectionStrategy.OnPush`, `@defer` (placeholder, loading, error), signals |
| 20 | `20-angular-query` | TanStack Query Angular: queries, mutations, caching, infinite scroll |
| 21 | `21-estado-global` | NGXS / NgRx Signals Store / NGSS, acciones, selectores |
| 22 | `22-typescript-avanzado` | Template Literal Types, Conditional Types, Mapped Types, satisfies, as const |
| 23 | `23-arquitectura` | Feature folders, servicios, guards, layouts, SCAM, enterprise patterns |
| 24 | `24-docker-despliegue` | Docker multi-stage, NGINX, GitHub Actions, deploy VPS/cloud |

## Nivel 4 — Especialización (Días 25–33)

| # | Carpeta | Tema |
|---|---------|------|
| 25 | `25-angular-ssr` | Angular SSR, `provideServerRendering`, Hydration, Server Routes, prerender |
| 26 | `26-tailwind-css` | Tailwind CSS: utilidades, responsivo, dark mode, Angular components |
| 27 | `27-e2e-playwright` | Playwright: navegador real, Page Object Model, fixtures |
| 28 | `28-animaciones` | `@angular/animations`, `trigger`, `state`, `transition`, `stagger`, `keyframes` |
| 29 | `29-i18n` | `@angular/localize`, i18n templates, traducciones, $localize |
| 30 | `30-storybook` | Storybook: stories, controles, Composition API, decoradores |
| 31 | `31-monorepo` | Nx: monorepo, executors, generators, caching, affected |
| 32 | `32-websockets` | RxJS `WebSocketSubject`, Socket.io, tiempo real, chat |
| 33 | `33-accesibilidad` | WCAG 2.2, ARIA, Angular CDK A11y, `@angular/cdk/a11y` |

## Nivel 5 — Arquitecturas Software (Días 34–38)

| # | Carpeta | Tema |
|---|---------|------|
| 34 | `34-arquitectura-hexagonal` | Puertos y Adaptadores, dominio puro, infraestructura intercambiable |
| 35 | `35-monolito-modular` | Módulos independientes, shared kernel, comunicación entre módulos |
| 36 | `36-event-driven` | RxJS Event Bus, eventos de dominio, SAGA, suscriptores, servicios desacoplados |
| 37 | `37-microfrontends` | Module Federation, host/remote, comunicación cross-MF, despliegue independiente |
| 38 | `38-ddd` | Value Objects, Entities, Aggregates, Repository, Domain Events |

## Nivel 6 — Backends Empresariales (Días 39–41)

| # | Carpeta | Tema |
|---|---------|------|
| 39 | `39-springboot-jwt` | Spring Boot 4.1.0 + JWT + Angular + Docker (integrado o separado) |
| 40 | `40-fastapi-jwt` | Python FastAPI + JWT + Angular + Docker (integrado o separado) |
| 41 | `40-dotnet-jwt` | .NET 10 + JWT + Angular + Docker (integrado o separado) |

## Nivel 7 — DevOps & Enterprise (Días 42–53)

| # | Carpeta | Tema |
|---|---------|------|
| 42 | `41-observability` | Sentry, OpenTelemetry, Web Vitals, logs, monitoreo |
| 43 | `42-feature-flags` | Feature flags, kill switches, rollout gradual, targeting |
| 44 | `43-oauth` | OAuth 2.0, `angular-oauth2-oidc`, Auth0, PKCE, login Google/GitHub |
| 45 | `44-graphql` | Apollo Angular, queries, mutations, caché normalizada |
| 46 | `45-seguridad` | OWASP Top 10, CSP, `DomSanitizer`, `SecurityContext`, XSS/CSRF |
| 47 | `46-design-system` | Angular CDK, Angular Material, design tokens, Storybook |
| 48 | `47-bff` | Backend for Frontend con Express, rate limiting, agregación |
| 49 | `48-pwa` | `@angular/pwa`, Service Worker, IndexedDB, offline, push |
| 50 | `49-state-machines` | State machines con XState + Angular, flujos complejos |
| 51 | `50-data-viz` | D3.js, ngx-charts, Chart.js, dashboards, KPIs |
| 52 | `51-server` | Angular + Express + Prisma ORM, CRUD, migraciones |
| 53 | `52-ci-cd-avanzado` | GitHub Actions multi-etapa, blue/green, canary, Docker |

## Nivel 8 — Especialización Moderna (Días 54–58)

| # | Carpeta | Tema |
|---|---------|------|
| 54 | `53-ionic` | Ionic + Capacitor, navegación, APIs nativas, cámara, GPS |
| 55 | `54-ai-integration` | LLMs, OpenAI/Claude, streaming SSE, RAG, prompt playground |
| 56 | `55-real-time-collab` | Y.js, CRDTs, WebSocket, edición colaborativa, awareness |
| 57 | `56-rendimiento-avanzado` | `$effect` avanzado, `afterRender`, SSR streaming, ISR, hidratación parcial |
| 58 | `57-threejs` | Three.js, Angular + Three.js, animaciones 3D, partículas |

## Tecnologías y Librerías

| Herramienta | Uso |
|-------------|-----|
| **Angular CLI** | Creación y gestión de proyectos |
| **Angular v22** | Framework web |
| **Angular Router** | Routing SPA con lazy loading |
| **Angular Forms** | Reactive Forms y Template-driven Forms |
| **Angular HTTP** | HttpClient con interceptores |
| **Angular CDK** | Component Dev Kit (tablas, a11y, overlay) |
| **Angular Material** | Componentes Material Design |
| **Signals** | Reactividad granular (signal, computed, effect) |
| **RxJS** | Programación reactiva y streams asíncronos |
| **TanStack Query** | Server state / caching |
| **NGXS / NgRx Signals** | Estado global |
| **Zod** | Validación de esquemas |
| **Jasmine + Karma / Jest** | Testing unitario |
| **Playwright** | Testing E2E multi-navegador |
| **Express** | Servidor Node.js |
| **Docker** | Contenerización |
| **Tailwind CSS** | Estilos utilitarios |
| **Angular Animations** | Animaciones declarativas |
| **Storybook** | Catálogo de componentes |
| **Nx** | Monorepo manager |
| **Socket.io** | WebSockets / tiempo real |
| **Spring Boot 4.1.0** | Backend Java empresarial con JWT |
| **.NET 10** | Backend C# empresarial con JWT |
| **FastAPI (Python)** | Backend Python asíncrono con JWT |
| **Sentry** | Error tracking y performance |
| **OpenTelemetry** | Trazas distribuidas y métricas |
| **Auth0** | OAuth 2.0 / OpenID Connect |
| **Apollo Angular** | GraphQL client |
| **GraphQL** | Lenguaje de consulta para APIs |
| **Prisma** | ORM type-safe para Node.js |
| **Ionic + Capacitor** | Mobile framework para Angular |
| **XState** | Máquinas de estado finitas |
| **D3.js** | Visualización de datos con SVG |
| **ngx-charts** | Gráficos declarativos para Angular |
| **Three.js** | 3D graphics library |
| **Y.js** | CRDTs para edición colaborativa |
| **GitHub Actions** | CI/CD pipelines |

## Cómo usar este repositorio

```bash
# 1. Clona o crea la carpeta raíz
cd angular

# 2. Cada carpeta contiene su propio proyecto (Angular CLI)
cd 02-intro-angular
npm install
ng serve

# 3. Para proyectos especiales:
#    Módulo 25 (SSR):        ng serve
#    Módulo 53 (Ionic):      ionic serve
#    Módulos 39/40/40 (backends): docker compose up
#    Módulos 47, 51, 54, 55: npm run dev:all (frontend + servidor)

# 4. Sigue el orden numérico recomendado
```

## Metodología

1. **Lee** el README de la carpeta (explicación teórica)
2. **Analiza** el código del proyecto
3. **Modifica** y experimenta
4. **Completa** los ejercicios propuestos

---

> **Angular Mastery Roadmap — Aprende haciendo, construye como profesional.**
