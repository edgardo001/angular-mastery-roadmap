# Memoria del Proyecto — Angular Mastery Roadmap

## Errores y Soluciones

| Fecha | Proyecto | Error | Causa | Solución |
|-------|----------|-------|-------|----------|
| 2025-06 | 06-ciclo-vida | afterEveryRender no compila | API inexistente en Angular | Cambiar a afterRender |
| 2025-06 | 05-10 | TS6304 rootDir | TypeScript no sabe dónde empiezan archivos fuente | Agregar rootDir en tsconfig.json |
| 2025-06 | 07-formularios | @angular/router innecesario | Dependencia incluida sin usarse | Remover de package.json |

## Decisiones de Arquitectura

| Fecha | Decisión | Razón |
|-------|----------|-------|
| 2025-06 | Standalone components en todos los ejemplos | Angular 22+ usa standalone por defecto |
| 2025-06 | inject() en vez de constructor DI | Forma moderna Angular 22+ |
| 2025-06 | Signals para estado local | Angular 22+ prioriza signals sobre RxJS |

## Convenciones

| Fecha | Convención | Detalle |
|-------|------------|---------|
| 2025-06 | Comentarios desde cero | Todo archivo .ts debe tener comentarios explicativos |
| 2025-06 | Archivos del Proyecto | Tabla en README listando cada archivo |
| 2025-06 | 10 agentes de revisión | Líder Técnico, Arquitecto, Profesor, etc. |
| 2026-06 | Builder moderno | Usar @angular/build (no @angular-devkit/build-angular) |
| 2026-06 | Conceptos y Ejercicios | Todo README debe tener secciones Conceptos y Ejercicios |
| 2026-06 | Comentarios educativos completos | Todo .ts debe tener analogías del mundo real y explicación de keywords |
| 2026-06 | Named imports para librerías grandes | Usar `import { X } from 'three'` en vez de `import * as THREE` para tree-shaking |
| 2026-06 | @defer para componentes pesados | Envolver componentes con Three.js/D3/etc en `@defer (on viewport)` para lazy-load |

## Auditoría Completa — Proyectos 11 al 57

### Resumen Ejecutivo
Se revisaron 47 proyectos del 11 al 57. Todos compilan exitosamente. 5 problemas transversales detectados.

### Problemas Transversales
| # | Problema | Afectados | Prioridad | Estado |
|---|----------|-----------|-----------|--------|
| 1 | Falta rootDir en tsconfig.json | 47/47 (100%) | Critico | RESUELTO (commit 98af775) |
| 2 | README sin tabla Archivos del Proyecto | 47/47 (100%) | Critico | RESUELTO (commit ee13ac0) |
| 3 | Código sin comentarios educativos | 47/47 (100%) | Critico | RESUELTO (agentes paralelos) |
| 4 | Builder legacy (@angular-devkit) | 9/58 (16%) | Alto | RESUELTO módulos 02-10 (agentes paralelos) |
| 5 | README incompleto (sin Conceptos/Ejercicios) | 11-24 | Alto | RESUELTO (agentes paralelos) |

### Bugs / Issues por Proyecto (Actualizado 2026-06-30)
- 19-render-performance: Sin script test en package.json — RESUELTO
- 20-angular-query: README formato generico Angular CLI — RESUELTO (reestructurado con secciones correctas)
- 22-typescript-avanzado: Sin paths/baseUrl en tsconfig — RESUELTO (baseUrl + paths aliases)
- 30-storybook: Builder legacy — RESUELTO (reemplazado @angular-devkit por @angular/build)
- 31-monorepo: No es Nx real — RESUELTO (implementado Nx real con apps/libs)
- 32-websockets: Builder legacy — RESUELTO (reemplazado @angular-devkit por @angular/build)
- 33-accesibilidad: Builder legacy — RESUELTO (reemplazado @angular-devkit por @angular/build)
- 35-monolito-modular: README ingles/espanol mezclado — RESUELTO (traducido a español)
- 37-microfrontends: Sin Module Federation — RESUELTO (implementado con @angular-architects/module-federation)
- 39/40-springboot-dotnet-fastapi: Encoding corrupto en README, builder legacy — RESUELTO
- 41-observability: Sentry solo, sin OpenTelemetry real — RESUELTO (WebTracerProvider + ConsoleSpanExporter + interceptor)
- 42-feature-flags: Flags solo locales, sin API remota — RESUELTO (FeatureFlagsApiService simulada + refresh)
- 43-oauth: Sin PKCE visible, sin login social — RESUELTO (disablePkce: false + auth-providers.config.ts)
- 44-graphql: URL placeholder, sin subscriptions — RESUELTO (API real countries.trevorblades.com)
- 45-seguridad: BUG sanitize — RESUELTO (commit 7a64c2e)
- 46-design-system: Sin CDK/Material, sin Storybook — RESUELTO (agregado @angular/cdk, @angular/material, Storybook)
- 48-pwa: Sin VAPID keys, sin IndexedDB/Dexie — RESUELTO (implementado Dexie.js + VAPID keys + notificaciones push)
- 49-state-machines: Sin guards/actions/invoke reales — RESUELTO (context, assign, guards, invoke con fromPromise)
- 50-data-viz: Sin D3.js — RESUELTO (implementado con gráficos D3: bar, line, pie)
- 53-ionic: Falta capacitor.config.ts — RESUELTO (commit f9afee1)
- 54-ai-integration: API key via prompt() inseguro, sin backend proxy — RESUELTO (Express proxy + .env)
- 55-real-time-collab: CRDT custom en vez de Y.js — RESUELTO (Y.Doc + y-websocket + y-indexeddb + Awareness)
- 57-threejs: Budget warning 707kB excede 500kB — RESUELTO (named imports + @defer lazy-load)

### Acciones Completadas (2026-06-30)
1. Agregar rootDir a los 47 tsconfig.json — RESUELTO
2. Actualizar builder a @angular/build en módulos 02-10 — RESUELTO
3. Agregar tabla Archivos del Proyecto a todos los README — RESUELTO
4. Agregar comentarios educativos a todos los archivos .ts — RESUELTO (58/58 módulos)
5. Completar READMEs 11-24 con Conceptos y Ejercicios — RESUELTO
6. Corregir BUG en 45-seguridad (sanitize pipe) — RESUELTO
7. Agregar capacitor.config.ts en 53-ionic — RESUELTO
8. Implementar Module Federation REAL en 37-microfrontends — RESUELTO
9. Implementar Nx REAL en 31-monorepo con apps/libs — RESUELTO
10. Agregar D3.js a 50-data-viz (bar, line, pie charts) — RESUELTO
11. Agregar VAPID keys y Dexie.js a 48-pwa — RESUELTO
12. Corregir URL GraphQL + subscriptions en 44-graphql — RESUELTO
13. Agregar CDK/Material + Storybook a 46-design-system — RESUELTO
14. Limpiar dependencias residual builder en 30, 32, 33 — RESUELTO
15. Corregir encoding README en 39, 40-dotnet, 40-fastapi — RESUELTO
16. Agregar rootDir en tsconfig de 39, 40-dotnet, 40-fastapi — RESUELTO
17. Agregar script test en 19-render-performance — RESUELTO
18. Reducir bundle size de 57-threejs (707kB → 210kB) — RESUELTO (named imports + @defer)
19. Corregir README 20-angular-query formato genérico — RESUELTO (reestructurado con secciones correctas)
20. Agregar paths/baseUrl en tsconfig 22-typescript-avanzado — RESUELTO (baseUrl + @app/*, @services/*, @models/*)
21. Unificar idioma README 35-monolito-modular — RESUELTO (traducido inglés a español)
22. Agregar OpenTelemetry real a 41-observability — RESUELTO (WebTracerProvider + ConsoleSpanExporter + interceptor)
23. Agregar API remota a 42-feature-flags — RESUELTO (FeatureFlagsApiService simulada + refresh remoto)
24. Implementar PKCE y login social en 43-oauth — RESUELTO (disablePkce: false + auth-providers.config.ts)
25. Agregar guards/actions/invoke reales a 49-state-machines — RESUELTO (context, assign, guards, invoke con fromPromise)
26. Crear backend proxy seguro en 54-ai-integration — RESUELTO (Express proxy + .env + API key nunca en browser)
27. Implementar Y.js en 55-real-time-collab — RESUELTO (Y.Doc + y-websocket + y-indexeddb + Awareness)

### Acciones Pendientes (Lider Tecnico)
1. ~~Reducir bundle size de 57-threejs (707kB → 210kB)~~ — RESUELTO (named imports + @defer)
2. ~~20-angular-query: Corregir README formato genérico~~ — RESUELTO (reestructurado con secciones correctas)
3. ~~22-typescript-avanzado: Agregar paths/baseUrl en tsconfig~~ — RESUELTO (baseUrl + @app/*, @services/*, @models/*)
4. ~~35-monolito-modular: Unificar idioma en README~~ — RESUELTO (traducido inglés a español)
5. ~~41-observability: Agregar OpenTelemetry real~~ — RESUELTO (WebTracerProvider + ConsoleSpanExporter + interceptor)
6. ~~42-feature-flags: Agregar API remota~~ — RESUELTO (FeatureFlagsApiService simulada + refresh remoto)
7. ~~43-oauth: Implementar PKCE y login social~~ — RESUELTO (disablePkce: false + auth-providers.config.ts)
8. ~~49-state-machines: Agregar guards/actions/invoke reales~~ — RESUELTO (context, assign, guards, invoke con fromPromise)
9. ~~54-ai-integration: Crear backend proxy seguro~~ — RESUELTO (Express proxy + .env + API key nunca en browser)
10. ~~55-real-time-collab: Implementar Y.js~~ — RESUELTO (Y.Doc + y-websocket + y-indexeddb + Awareness)
