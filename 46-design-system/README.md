## 46 ÔÇö Design System con Angular CDK + Material

Creaci├│n de un Design System completo con Angular CDK, Angular Material, design tokens y Storybook.

> **Prop├│sito:** Crear un Design System interno con Angular: componentes base, variantes por props, tokens de dise├▒o (colores, tipograf├¡a, spacing), documentaci├│n con Storybook.
>
> **Problema que resuelve:** Sin Design System, cada equipo/feature implementa sus propios estilos resultando en interfaces inconsistentes, duplicaci├│n de c├│digo y dificultad de mantenimiento.
>
> **C├│mo lo resuelve:** Componentes base con variantes configurables v├¡a inputs, CSS custom properties como design tokens, Storybook como cat├ílogo vivo, y npm package para compartir.
>
> **Por qu├® aprenderlo:** Los Design Systems son el est├índar en organizaciones con m├║ltiples equipos/productos; reducen el tiempo de desarrollo UI en un 50% y garantizan consistencia visual.

### Conceptos Clave

- **Angular CDK**: `@angular/cdk`, `overlay`, `portal`, `drag-drop`, `a11y`, `table`
- **Angular Material**: `@angular/material`, componentes MDC, theming
- **Design Tokens**: variables CSS, tokens tipados con TypeScript
- **Componentes headless**: CDK primitives sin estilos predefinidos
- **Theming**: `defineTheme`, paletas, tipograf├¡a, densidades
- **CVA (Control Value Accessor)**: componentes de formulario personalizados
- **Storybook**: documentaci├│n visual de cada componente
- **Componentes**: Button, Input, Select, Modal, Table, Toast, DatePicker
- **Modo oscuro**: paleta de colores din├ímica con se├▒ales

### Proyecto

Design System completo con 10+ componentes, theming din├ímico con se├▒ales, modo oscuro y documentaci├│n en Storybook.

### Ejercicios

1. Configura Angular Material con tema personalizado
2. Crea un `Button` component con variantes usando CDK
3. Implementa `ControlValueAccessor` para Input personalizado
4. Crea un `Modal` con `CdkPortal` y `Overlay`
5. Registra todos los componentes en Storybook
6. Implementa modo oscuro con se├▒ales y CSS variables

### C├│mo ejecutar

```bash
cd 46-design-system
npm install
ng serve
```
