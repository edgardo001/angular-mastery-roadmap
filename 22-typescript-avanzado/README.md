# 22TypescriptAvanzado

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.1.

> **Propósito:** Utilizar características avanzadas de TypeScript (template literals, conditional types, satisfies, mapped types) para tipar APIs y servicios genéricos Angular.
>
> **Problema que resuelve:** El tipado básico no cubre patrones complejos como transformaciones de tipos dinámicos, tipos condicionales según input, o validación de objetos literales contra interfaces.
>
> **Cómo lo resuelve:** Template literal types construyen tipos dinámicamente, conditional types adaptan el tipo según condiciones, satisfies valida objetos literales, y mapped types transforman propiedades.
>
> **Por qué aprenderlo:** TypeScript avanzado permite escribir librerías y servicios genéricos con tipado perfecto; es el nivel necesario para contribuir a frameworks y crear abstracciones elegantes.

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
