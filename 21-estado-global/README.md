# EstadoGlobal

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.1.

> **Propósito:** Gestionar estado global con NgRx Signals (signalStore): withState, withComputed, withMethods, withHooks para una store tipada y reactiva.
>
> **Problema que resuelve:** El estado compartido entre rutas y componentes lejanos requiere una solución global; sin ella, los datos se duplican, desincronizan y la lógica de negocio se dispersa.
>
> **Cómo lo resuelve:** signalStore proporciona una store centralizada con estado como señales, computed properties derivadas, métodos para actualizaciones y hooks de ciclo de vida — todo tipado.
>
> **Por qué aprenderlo:** NgRx Signals es el estado global moderno de Angular; combina la reactividad de signals con la estructura predecible de NgRx, sin el boilerplate de Redux clásico.

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
