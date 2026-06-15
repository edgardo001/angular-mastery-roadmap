## 06 — Ciclo de Vida y Efectos

Hooks de ciclo de vida, `effect()` para reactividad, y `afterNextRender`/`afterRender` para interacciones con el DOM y APIs del navegador.

### Conceptos Clave

- **`ngOnInit()`**: inicialización del componente
- **`ngAfterViewInit()`**: después de que la vista se renderiza
- **`ngOnDestroy()`**: cleanup, unsubscribe, destroyRef
- **`effect()`**: ejecuta efectos cuando las señales cambian
- **`afterNextRender()`**: ejecuta una vez después del próximo render
- **`afterRender()`**: ejecuta después de cada render (específico para DOM)
- **`DestroyRef`**: alternativa moderna a `ngOnDestroy` para cleanup
- **`takeUntilDestroyed()`**: operador RxJS para cleanup automático

### Proyecto

Cronómetro con efectos: start/stop, tiempo transcurrido, log de vueltas, persistencia con `effect()`.

### Ejercicios

1. Usa `ngOnInit` para cargar datos iniciales
2. Implementa `effect()` para sincronizar estado con localStorage
3. Usa `afterNextRender` para medir un elemento del DOM
4. Limpia un interval con `DestroyRef`
5. Usa `takeUntilDestroyed` en un Observable

### Cómo ejecutar

```bash
cd 06-ciclo-vida
npm install
ng serve
```
