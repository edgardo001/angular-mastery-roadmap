## 04 — Estados y Eventos con Signals

Señales (`signal()`) como unidad fundamental de reactividad en Angular 22. Eventos del DOM, two-way binding y actualización de estado.

### Conceptos Clave

- **`signal()`**: creación, lectura (ejecución como función), `set()`, `update()`
- **`computed()`**: señales derivadas y memoizadas
- **Eventos del DOM**: `(click)`, `(input)`, `(change)`, `(keydown)`, `$event`
- **Two-way binding**: `[(ngModel)]`, `[(value)]` con `model()`
- **Template reference variables**: `#myVar` para acceder al DOM
- **`@let`**: variables locales en templates (Angular 22+)
- **`effect()`**: reaccionar a cambios de señal

### Proyecto

Contador interactivo con señales: incremento, decremento, reset, historial de cambios usando `effect()`.

### Ejercicios

1. Crea un `signal<number>` para un contador con botones +/-
2. Implementa un `computed` que muestre si es par o impar
3. Usa `effect()` para guardar en localStorage al cambiar
4. Convierte un input de texto a señal con two-way binding
5. Usa `@let` para crear variables locales en el template

### Cómo ejecutar

```bash
cd 04-estados-eventos
npm install
ng serve
```
