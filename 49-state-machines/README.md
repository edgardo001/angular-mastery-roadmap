## 49 ÔÇö State Machines (M├íquinas de Estado)

State machines con XState + Angular: flujos complejos, checkouts multi-paso, y modelado de procesos.

> **Prop├│sito:** Gestionar flujos complejos con XState en Angular: state machines, guards, actions, actors, y m├íquinas as├¡ncronas con servicios invocables.
>
> **Problema que resuelve:** El estado booleano m├║ltiple (isLoading, isError, isSuccess) crea estados imposibles (isLoading && isError) y dif├¡cil de mantener; flujos complejos como un wizard o checkout se vuelven ca├│ticos.
>
> **C├│mo lo resuelve:** XState define estados, transiciones y guards expl├¡citamente (solo un estado activo a la vez), con acciones para efectos secundarios y servicios para l├│gica as├¡ncrona.
>
> **Por qu├® aprenderlo:** State machines eliminan estados imposibles de ra├¡z; XState es el est├índar para flujos complejos (onboarding, checkout, multi-step forms) en producci├│n.


```mermaid
flowchart LR
    IDLE["idle"] -->|FETCH| LOAD["loading"]
    LOAD -->|SUCCESS| SUCC["success"]
    LOAD -->|ERROR| ERR["error"]
    ERR -->|RETRY| LOAD
    SUCC -->|RETRY| LOAD
```

### Conceptos Clave

- **XState**: `createMachine`, `interpret`, `useMachine`/`useInterpret`
- **State Machine vs State Chart**: estados, transiciones, eventos, guards
- **M├íquinas en Angular**: `interpret` + se├▒al para estado reactivo
- **Acciones**: efectos secundarios al entrar/salir de estados
- **Guards**: condiciones para transiciones
- **Servicios (invoke)**: promesas, observables como actores
- **Jerarqu├¡a (compound states)**: estados anidados
- **Historia**: `history` para recordar estado previo
- **Inspecci├│n**: XState DevTools, `@xstate/inspect`
- **Patr├│n SAGA con XState**: flujo de pedidos con rollback

### Proyecto

Checkout multi-paso como m├íquina de estados: carrito -> env├¡o -> pago -> confirmaci├│n, con rollback en errores.

### Ejercicios

1. Define m├íquina de estados para checkout
2. Integra XState con se├▒ales de Angular
3. Implementa guards (validaci├│n antes de avanzar)
4. A├▒ade acciones as├¡ncronas con `invoke`
5. Usa estados compuestos (anidados) para sub-flujos

### C├│mo ejecutar

```bash
cd 49-state-machines
npm install
ng serve
```
