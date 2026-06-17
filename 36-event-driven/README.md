## 36 — Arquitectura Orientada a Eventos

Patrón Event-Driven con RxJS Event Bus, SAGA pattern, eventos de dominio y comunicación desacoplada entre módulos.

> **Propósito:** Implementar arquitectura event-driven con EventBus, typed domain events, SAGA pattern y compensating transactions para flujos distribuidos.
>
> **Problema que resuelve:** Las operaciones de negocio multi-paso (crear orden → cobrar → actualizar inventario) sin eventos son acopladas, difíciles de extender y sin capacidad de rollback.
>
> **Cómo lo resuelve:** EventBusService con Subject tipado, dominio events (OrderPlaced, PaymentReceived, etc.), SAGA orquesta flujos multi-paso, compensating transactions revierten operaciones fallidas.
>
> **Por qué aprenderlo:** Event-driven es el patrón para sistemas desacoplados y resilientes; la SAGA pattern es esencial para transacciones distribuidas en microservicios.


```mermaid
flowchart LR
    C1_36["Componente A"] --> BUS["Event Bus (Subject)"]
    C2_36["Componente B"] --> BUS
    BUS --> H1["Handler 1 (actualiza señal)"]
    BUS --> H2["Handler 2 (llama API)"]
    BUS --> H3["Handler 3 (logging)"]
```

### Conceptos Clave

- **Event Bus**: servicio RxJS que emite/escucha eventos desacoplados
- **Eventos de dominio**: `OrderPlaced`, `PaymentReceived`, `InventoryUpdated`
- **`Subject` como bus**: `Subject<DomainEvent>`, filtro por tipo
- **SAGA pattern**: coreografía de eventos, rollback compensatorio
- **Comunicación cross-module**: sin importar módulos, solo eventos
- **Tipado**: eventos con tipo discriminado (`type` + `payload`)
- **Middleware**: logging, auditoría, metrics en el bus
- **Escalabilidad**: módulos reaccionan sin conocerse

### Proyecto

Sistema de pedidos con SAGA: OrderPlaced -> PaymentProcessed -> InventoryUpdated -> NotificationSent. Rollback en fallo.

### Ejercicios

1. Crea un `EventBusService` con RxJS Subject
2. Define eventos de dominio tipados con uniones discriminadas
3. Implementa SAGA para flujo de pedido completo
4. Añade rollback compensatorio en caso de error
5. Desacopla dos módulos usando solo eventos

### Cómo ejecutar

```bash
cd 36-event-driven
npm install
ng serve
```
