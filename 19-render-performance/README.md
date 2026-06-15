## 19 — Render y Performance

Optimización de renderizado: ChangeDetectionStrategy.OnPush, @defer, signals, y lazy loading de componentes.

### Conceptos Clave

- **`ChangeDetectionStrategy.OnPush`**: detección solo cuando inputs/señales cambian
- **`@defer`**: carga diferida de componentes con trigger
- **Triggers**: `on viewport`, `on interaction`, `on hover`, `on immediate`, `on timer`
- **Placeholder/Loading/Error**: bloques para estados de carga diferida
- **`markForCheck()`**: marcar para detección manual (legacy, evitar con señales)
- **Signals y OnPush**: señales detectan cambios sin `markForCheck`
- **`@angular/core`**: `ChangeDetectionStrategy` en standalone components
- **`provideZoneChangeDetection`**: configuración de zone.js
- **Lazy components**: `loadComponent` en router

### Proyecto

Dashboard con componentes pesados cargados con @defer, OnPush en todos los componentes, y profiling de rendimiento.

### Ejercicios

1. Configura todos los componentes con `OnPush`
2. Implementa `@defer` con trigger `on viewport`
3. Añade bloques `placeholder`, `loading` y `error` en @defer
4. Usa `@defer (on interaction)` para contenido bajo demanda
5. Compara rendimiento con/without OnPush usando Chrome DevTools

### Cómo ejecutar

```bash
cd 19-render-performance
npm install
ng serve
```
