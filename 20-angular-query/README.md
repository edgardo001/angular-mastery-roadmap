# AngularQuery

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.1.

> **Propósito:** Manejar estado servidor con TanStack Query (Angular Query): caching, refetch automático, paginación, mutations y optimistic updates.
>
> **Problema que resuelve:** El fetching manual con HttpClient + services requiere manejar caching, refetch, loading states, errores y sincronización — código repetitivo y propenso a bugs.
>
> **Cómo lo resuelve:** Angular Query con injectQuery/injectMutation abstrae caching automático, stale-while-revalidate, refetch en background, paginación infinita y optimistic updates con rollback.
>
> **Por qué aprenderlo:** TanStack Query es la librería estándar para estado servidor en Angular; elimina ~60% del boilerplate de llamadas HTTP y sincroniza datos automáticamente.


```mermaid
flowchart LR
    CMP["Componente"] --> Q["injectQuery()"]
    Q --> CACHE["Cache"]
    CACHE --> FETCH["Fetch API"]
    FETCH --> SERVER["Servidor"]
    SERVER --> CACHE
    CMP --> MUT["injectMutation()"]
    MUT --> API["POST / PUT / DELETE"]
    API --> CACHE
```

## Development server

To start a local development server, run:

```bash
ng serve --host 0.0.0.0 --port 8080
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

### Archivos del Proyecto

| Archivo | Propósito | Ruta |
|---------|-----------|------|
| `angular.json` | Configuración del proyecto Angular | `angular.json` |
| `package.json` | Dependencias y scripts del proyecto | `package.json` |
| `tsconfig.json` | Configuración base de TypeScript | `tsconfig.json` |
| `tsconfig.app.json` | Configuración TypeScript de la aplicación | `tsconfig.app.json` |
| `tsconfig.spec.json` | Configuración TypeScript para pruebas | `tsconfig.spec.json` |
| `.editorconfig` | Configuración del editor de código | `.editorconfig` |
| `.gitignore` | Archivos ignorados por Git | `.gitignore` |
| `.prettierrc` | Configuración de formateo Prettier | `.prettierrc` |
| `.vscode/extensions.json` | Extensiones recomendadas de VSCode | `.vscode/extensions.json` |
| `.vscode/launch.json` | Configuración de depuración en VSCode | `.vscode/launch.json` |
| `.vscode/tasks.json` | Tareas automatizadas de VSCode | `.vscode/tasks.json` |
| `public/favicon.ico` | Icono de la aplicación | `public/favicon.ico` |
| `src/index.html` | Punto de entrada HTML de la aplicación | `src/index.html` |
| `src/main.ts` | Punto de entrada principal de Angular | `src/main.ts` |
| `src/styles.css` | Estilos globales de la aplicación | `src/styles.css` |
| `src/app/app.ts` | Componente raíz de la aplicación | `src/app/app.ts` |
| `src/app/app.html` | Template del componente raíz | `src/app/app.html` |
| `src/app/app.css` | Estilos del componente raíz | `src/app/app.css` |
| `src/app/app.config.ts` | Configuración de providers de la aplicación | `src/app/app.config.ts` |
| `src/app/app.spec.ts` | Pruebas unitarias del componente raíz | `src/app/app.spec.ts` |
