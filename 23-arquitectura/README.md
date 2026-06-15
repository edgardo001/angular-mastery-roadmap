# 23Arquitectura

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.1.

> **Propósito:** Estructurar proyectos Angular profesionales con separación por features (feature folders), core/shared/layouts, barrel exports y lazy loading por dominio.
>
> **Problema que resuelve:** Proyectos sin estructura crecen desordenadamente con archivos mezclados, imports largos y dependencias circulares que dificultan el mantenimiento y onboarding.
>
> **Cómo lo resuelve:** Feature folders agrupan por dominio de negocio, core/shared separa infraestructura de utilidades, layouts centralizan estructuras de página, y barrel exports simplifican imports.
>
> **Por qué aprenderlo:** La estructura del proyecto determina su mantenibilidad a largo plazo; una buena arquitectura reduce el costo de cambios y facilita escalar el equipo.

## Development server

To start a local development server, run:

```bash
ng serve
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
