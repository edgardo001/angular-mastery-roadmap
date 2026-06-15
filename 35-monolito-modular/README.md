## 35 — Monolito Modular

Arquitectura de monolito modular en Angular: módulos independientes con sus propios límites, APIs y dependencias controladas.

> **Propósito:** Organizar aplicaciones monolíticas en módulos independientes (Orders, Inventory, Billing) con boundaries claros, shared kernel y API pública explícita.
>
> **Problema que resuelve:** Los monolitos sin modularidad crecen caóticamente con dependencias cruzadas entre features, making the codebase impossible to maintain and scale.
>
> **Cómo lo resuelve:** Feature modules aislados con sus propias rutas/servicios/componentes, shared kernel con contratos compartidos, barrel exports que definen API pública explícita de cada módulo.
>
> **Por qué aprenderlo:** El 90% de las apps Angular son monolitos; modularizarlos bien es la diferencia entre un código mantenible y un legacy inmanejable.

### Conceptos Clave

- **Módulo independiente**: feature completo con sus propias rutas, servicios, componentes
- **Shared Kernel**: código compartido mínimo y estable (tipos, utils, contrato de eventos)
- **APIs explícitas**: cada módulo exporta una interfaz pública clara
- **Prohibición de dependencias directas**: módulos no importan otros módulos directamente
- **Comunicación**: a través de shared kernel o event bus
- **Module Boundaries**: reglas de lint para mantener independencia
- **Lazy Loading**: cada módulo cargado bajo demanda
- **Aislamiento**: un módulo puede extraerse a microfrontend sin refactor

### Proyecto

App e-commerce con módulos Auth, Catalog, Cart, Checkout independientes. Cada uno con su propia ruta, estado y servicios.

### Ejercicios

1. Define el shared kernel con tipos y contratos
2. Implementa módulo `Catalog` completamente independiente
3. Implementa módulo `Cart` que se comunica via shared kernel
4. Verifica boundaries con ESLint/Nx module boundary rules
5. Extrae un módulo como librería independiente

### Cómo ejecutar

```bash
cd 35-monolito-modular
npm install
ng serve
```
