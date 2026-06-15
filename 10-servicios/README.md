## 10 — Servicios y RxJS

Servicios en Angular con señales y RxJS: Subjects, BehaviorSubject, operadores, `toSignal` y `toObservable`.

### Conceptos Clave

- **Servicios**: lógica compartida, estado, comunicación cross-component
- **`Subject`**: observable multicástico básico
- **`BehaviorSubject`**: observable con valor inicial (último valor siempre disponible)
- **`ReplaySubject`**: replay de N valores anteriores
- **`AsyncSubject`**: solo emite el último valor al completarse
- **Operadores RxJS**: `map`, `filter`, `switchMap`, `debounceTime`, `catchError`, `takeUntil`
- **`toSignal()`**: convierte Observable a señal (read-only)
- **`toObservable()`**: convierte señal a Observable
- **`async` pipe**: suscripción automática en templates
- **Unsubscribe**: `takeUntilDestroyed()`, `DestroyRef`

### Proyecto

Servicio de carrito de compras con señales y RxJS: agregar/remover items, total calculado con computed, sincronización con API.

### Ejercicios

1. Crea un servicio con `BehaviorSubject` para estado del carrito
2. Convierte el observable a señal con `toSignal()`
3. Usa `switchMap` para cancelar peticiones previas en búsqueda
4. Implementa debounce en un input de búsqueda con `debounceTime`
5. Limpia suscripciones con `takeUntilDestroyed()`

### Cómo ejecutar

```bash
cd 10-servicios
npm install
ng serve
```
