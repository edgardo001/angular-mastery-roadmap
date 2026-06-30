# Memoria del Proyecto — Angular Mastery Roadmap

## Errores y Soluciones

| Fecha | Proyecto | Error | Causa | Solución |
|-------|----------|-------|-------|----------|
| 2025-06 | 06-ciclo-vida | `afterEveryRender` no compila | API inexistente en Angular (nunca existió) | Cambiar a `afterRender` |
| 2025-06 | 05-10 | TS6304 rootDir | TypeScript no sabe dónde empiezan los archivos fuente | Agregar `"rootDir": "./src"` en `compilerOptions` del `tsconfig.json` |
| 2025-06 | 07-formularios | `@angular/router` innecesario | Dependencia incluida sin usarse | Remover de `package.json` |

## Decisiones de Arquitectura

| Fecha | Decisión | Razón |
|-------|----------|-------|
| 2025-06 | Standalone components en todos los ejemplos | Angular 22+ usa standalone por defecto, sin NgModules |
| 2025-06 | `inject()` en vez de constructor DI | Más limpio, más legible, forma moderna Angular 22+ |
| 2025-06 | Signals para estado local | Angular 22+ prioriza signals sobre RxJS para estado síncrono |
| 2025-06 | CurrencyPipe importado directamente | Más explícito que importar CommonModule completo |

## Convenciones

| Fecha | Convención | Detalle |
|-------|------------|---------|
| 2025-06 | Comentarios desde cero | Todo archivo `.ts` debe tener comentarios explicativos para principiantes |
| 2025-06 | Analogías del mundo real | Cada concepto debe tener una analogía intuitiva |
| 2025-06 | Glosario en README | Términos nuevos se definen en tabla del README |
| 2025-06 | Archivos del Proyecto | Tabla en README listando cada archivo y su propósito |
| 2025-06 | 10 agentes de revisión | Líder Técnico, Arquitecto, Profesor, Desarrollador, QA, UI/UX, Seguridad, DevOps, Alumno, Git |
| 2025-06 | Commits atómicos | Un commit por cambio lógico, Conventional Commits con scope numérico |

## Dependencias

| Paquete | Versión | Notas |
|---------|---------|-------|
| @angular/core | ^22.0.0 | Versión mínima del roadmap |
| zone.js | ~0.15.0 | Requerido para change detection |
| typescript | ~6.0.0 | Requerido por Angular 22 |
| rxjs | ~7.8.0 | Para servicios con Subjects y operadores |

## Configuraciones Críticas

| Archivo | Setting | Valor | Por qué |
|---------|---------|-------|---------|
| `tsconfig.json` | `rootDir` | `"./src"` | Sin esto, TypeScript falla con TS6304 |
| `tsconfig.json` | `strict` | `true` | Obligatorio para calidad de código |
| `angular.json` | `builder` | `@angular/build:application` | Builder actualizado Angular 22+ |
| `angular.json` | `polyfills` | `["zone.js"]` | Requerido para change detection |
