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

### Bugs / Issues por Proyecto
- 19-render-performance: Sin script test en package.json
- 20-angular-query: README formato generico Angular CLI
- 22-typescript-avanzado: Sin paths/baseUrl en tsconfig
- 30-storybook: Builder legacy
- 31-monorepo: No es Nx real (sin apps/libs, sin pnpm-workspace)
- 32-websockets: Builder legacy, sin reconexion
- 33-accesibilidad: Builder legacy, falta FocusTrap/LiveAnnouncer
- 35-monolito-modular: README ingles/espanol mezclado
- 37-microfrontends: Sin Module Federation (falso microfrontend)
- 39/40-springboot-dotnet-fastapi: Encoding corrupto en README, builder legacy
- 41-observability: Sentry solo, sin OpenTelemetry real
- 42-feature-flags: Flags solo locales, sin API remota
- 43-oauth: Sin PKCE visible, sin login social
- 44-graphql: URL placeholder, sin subscriptions
- 45-seguridad: BUG: sanitize(0,...) debe ser sanitize(SecurityContext.HTML,...) — RESUELTO (commit 7a64c2e)
- 46-design-system: Sin CDK/Material, sin Storybook
- 48-pwa: Sin VAPID keys, sin IndexedDB/Dexie
- 49-state-machines: Sin guards/actions/invoke reales
- 50-data-viz: Sin D3.js, solo Chart.js
- 53-ionic: Falta capacitor.config.ts — RESUELTO (commit f9afee1)
- 54-ai-integration: API key via prompt() inseguro, sin backend proxy
- 55-real-time-collab: CRDT custom en vez de Y.js
- 57-threejs: Budget warning 707kB excede 500kB

### Acciones Completadas (2026-06-30)
1. Agregar rootDir a los 47 tsconfig.json — RESUELTO
2. Actualizar builder a @angular/build en módulos 02-10 — RESUELTO
3. Agregar tabla Archivos del Proyecto a todos los README — RESUELTO
4. Agregar comentarios educativos a todos los archivos .ts — RESUELTO (58/58 módulos)
5. Completar READMEs 11-24 con Conceptos y Ejercicios — RESUELTO
6. Corregir BUG en 45-seguridad (sanitize pipe) — RESUELTO
7. Agregar capacitor.config.ts en 53-ionic — RESUELTO

### Acciones Pendientes (Lider Tecnico)
1. Implementar Module Federation real en 37-microfrontends
2. Implementar Nx real en 31-monorepo (apps/libs, pnpm-workspace)
3. Corregir issues menores de los módulos 39/40 (encoding README, builder legacy)
4. Agregar D3.js a 50-data-viz
5. Agregar VAPID keys y Dexie a 48-pwa
6. Reducir bundle size de 57-threejs (707kB → <500kB)
