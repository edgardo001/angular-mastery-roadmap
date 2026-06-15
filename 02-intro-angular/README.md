## 02 — Introducción a Angular con CLI

Primeros pasos con Angular 22: CLI, proyectos standalone, componentes, templates e interpolación. Angular con standalone components por defecto.

> **Propósito:** Aprender los fundamentos de Angular 22: componentes standalone, templates, binding y comunicación entre componentes.
>
> **Problema que resuelve:** Desarrollar SPAs vanilla JavaScript lleva a código desorganizado, sin estructura clara y difícil de escalar.
>
> **Cómo lo resuelve:** Angular impone una arquitectura basada en componentes, con separación clara de responsabilidades, binding bidireccional y sistema de módulos que organiza el código.
>
> **Por qué aprenderlo:** Es la puerta de entrada al framework más completo para SPAs empresariales. Establece el patrón mental para todo el desarrollo Angular.

### Conceptos Clave

- **Angular CLI**: `ng new`, `ng generate`, `ng serve`, `ng build`
- **Standalone Components**: `@Component({ standalone: true })`, sin NgModules
- **Templates**: interpolación `{{ }}`, property binding `[property]`, event binding `(event)`
- **Componentes**: `@Component`, selector, template, styles
- **Bootstrapping**: `bootstrapApplication`, `app.config.ts`
- **Estructura del proyecto**: `src/app/`, `main.ts`, `index.html`, `angular.json`

### Proyecto

Portfolio personal con 3 componentes standalone (Header, Hero, Footer) usando Angular CLI.

### Ejercicios

1. Crea un proyecto con `ng new portfolio --standalone`
2. Genera 3 componentes: `Header`, `Hero`, `Footer`
3. Usa interpolación para mostrar título y descripción
4. Aplica property binding a imágenes y event binding a botones
5. Configura `bootstrapApplication` con providers

### Cómo ejecutar

```bash
cd 02-intro-angular
npm install
ng serve
```

Abrir en `http://localhost:4200`
