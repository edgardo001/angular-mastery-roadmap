## 11 — Signals y Estado Local

Gestión de estado con señales: `signal()`, `computed()`, `effect()`, `untracked()`, y `linkedSignal()` para estado derivado.

### Conceptos Clave

- **`signal()`**: estado reactivo mutable
- **`computed()`**: estado derivado memoizado (solo lectura)
- **`effect()`**: reaccionar a cambios (timing, cleanup)
- **`untracked()`**: leer señales sin crear dependencias
- **`linkedSignal()`**: señal vinculada que se resetea cuando su fuente cambia
- **`signal.equal()`**: comparador personalizado para evitar renders innecesarios
- **Patrón de stores**: encapsular señales en servicios con API pública
- **Estado inmutable**: actualizar objetos/arrays con spread operator o `structuredClone`

### Proyecto

Gestor de tareas avanzado con señales: filtros, búsqueda, persistencia, historial de cambios con linkedSignal.

### Ejercicios

1. Implementa un store de señales para lista de tareas con add/remove/toggle
2. Usa `computed` para tareas filtradas y conteo
3. Usa `linkedSignal` para un selector que se resetea al cambiar la categoría
4. Persiste estado con `effect()` y localStorage
5. Implementa `untracked` para logging sin dependencias

### Cómo ejecutar

```bash
cd 11-signals-estado
npm install
ng serve
```
