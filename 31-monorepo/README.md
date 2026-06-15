## 31 — Monorepo con Nx

Monorepos con Nx para proyectos Angular: generadores, executors, caching distribuido, affected commands.

> **Propósito:** Estructurar proyectos Angular con Nx: configuración de workspace, librerías compartidas, affected commands, computation caching y generación de código.
>
> **Problema que resuelve:** Mantener múltiples apps Angular sin monorepo lleva a duplicación de configuración, librerías desincronizadas y esfuerzo repetido en CI para cada proyecto.
>
> **Cómo lo resuelve:** Nx con nx.json configura el workspace, libs/ contiene librerías compartidas, affected commands ejecutan solo lo modificado, y computation caching acelera builds.
>
> **Por qué aprenderlo:** Nx es el estándar de monorepos Angular; usado por Google, Netflix y grandes empresas. Reduce tiempos de CI en 70% y facilita compartir código entre equipos.

### Conceptos Clave

- **Nx**: `npx create-nx-workspace`, `--preset=angular-monorepo`
- **Apps y Libs**: `apps/`, `libs/`, bibliotecas compartidas
- **Generadores**: `nx generate @nx/angular:component`, schematics
- **Executors**: `@nx/angular:build`, `@nx/angular:test`, custom executors
- **Caching**: cache local y remota (Nx Cloud), hash inputs
- **Affected**: `nx affected:test`, `nx affected:build`, solo lo modificado
- **Module boundaries**: `@nx/enforce-module-boundaries`, tags, reglas de dependencia
- **Bibliotecas compartidas**: shared UI kit, types, utils
- **Multi-framework**: Angular + Node/Express en el mismo workspace

### Proyecto

Monorepo Nx con 2 apps Angular (admin + client) y 3 libs (ui-kit, types, utils). Module boundaries configurados.

### Ejercicios

1. Crea workspace Nx con preset Angular
2. Genera libs compartidas: `ui`, `types`, `utils`
3. Crea aplicación admin en `apps/admin`
4. Configura module boundaries con tags
5. Ejecuta `nx affected:test` después de un cambio

### Cómo ejecutar

```bash
cd 31-monorepo
npm install
nx serve client
```
