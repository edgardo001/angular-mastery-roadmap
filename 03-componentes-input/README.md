## 03 — Componentes, Input y Output

Comunicación entre componentes con decoradores clásicos y la nueva API de señales: `input()`, `output()`, `model()`.

> **Propósito:** Dominar la comunicación entre componentes padre e hijo usando signals input/output, esencial para construir interfaces modulares y reutilizables.
>
> **Problema que resuelve:** Sin una comunicación estructurada, los componentes se acoplan creando código espagueti difícil de mantener y testear.
>
> **Cómo lo resuelve:** `input()` signal y `output()` proporcionan un contrato explícito y tipado entre componentes, siguiendo el flujo unidireccional de datos reactivos.
>
> **Por qué aprenderlo:** Es el patrón fundamental de composición en Angular; sin esto no se pueden construir UI modulares y reutilizables.

### Conceptos Clave

- **`@Input()`**: decorador para propiedades de entrada
- **`@Output()`**: decorador con `EventEmitter` para eventos de salida
- **`input()`**: señal de entrada (required, transform, alias)
- **`output()`**: función para eventos de salida (emite señales)
- **`model()`**: two-way binding con signals (`[(ngModel)]`-like)
- **`contentChild()`**: acceso a contenido proyectado como señal
- **`viewChild()`**: acceso a elementos del template como señal
- **Composición**: componentes dentro de componentes, proyección con `<ng-content>`

### Proyecto

Dashboard de tarjetas de producto con componente `ProductCard` configurable via inputs/outputs y signals.

### Ejercicios

1. Crea `ProductCard` con `@Input()` y `@Output()`
2. Migra a `input()` y `output()` signals
3. Implementa `model()` para un contador de cantidad
4. Usa `viewChild()` para acceder a un elemento del DOM nativo
5. Proyecta contenido personalizado con `<ng-content>`

### Cómo ejecutar

```bash
cd 03-componentes-input
npm install
ng serve
```
