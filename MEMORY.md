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

## Auditoría Completa — Proyectos 11 al 57

### Resumen Ejecutivo
Se revisaron 47 proyectos del 11 al 57. Todos compilan exitosamente. 5 problemas transversales detectados.

### Problemas Transversales
| # | Problema | Afectados | Prioridad |
|---|----------|-----------|-----------|
| 1 | Falta rootDir en tsconfig.json | 47/47 (100%) | Critico |
| 2 | README sin tabla Archivos del Proyecto | 47/47 (100%) | Critico |
| 3 | Código sin comentarios educativos | 47/47 (100%) | Critico |
| 4 | Builder legacy (@angular-devkit) | 22/47 (47%) | Alto |
| 5 | README incompleto (sin Conceptos/Ejercicios) | 11-24 | Alto |

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
- 45-seguridad: BUG: sanitize(0,...) debe ser sanitize(SecurityContext.HTML,...)
- 46-design-system: Sin CDK/Material, sin Storybook
- 48-pwa: Sin VAPID keys, sin IndexedDB/Dexie
- 49-state-machines: Sin guards/actions/invoke reales
- 50-data-viz: Sin D3.js, solo Chart.js
- 53-ionic: Falta capacitor.config.ts, faltan @capacitor/* deps
- 54-ai-integration: API key via prompt() inseguro, sin backend proxy
- 55-real-time-collab: CRDT custom en vez de Y.js
- 57-threejs: Budget warning 707kB excede 500kB

### Acciones Recomendadas (Lider Tecnico)
1. Agregar rootDir a los 47 tsconfig.json (tarea masiva con script)
2. Actualizar builder a @angular/build en los 22 proyectos legacy
3. Agregar tabla Archivos del Proyecto a todos los README
4. Agregar comentarios educativos a todos los archivos .ts
5. Corregir BUG en 45-seguridad (sanitize pipe)
6. Implementar Module Federation real en 37-microfrontends
7. Agregar capacitor.config.ts en 53-ionic
