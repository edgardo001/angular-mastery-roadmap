## 34 — Arquitectura Hexagonal (Ports & Adapters)

Arquitectura hexagonal en Angular: separación de dominio, aplicación e infraestructura. Puertos y adaptadores intercambiables.

> **Propósito:** Implementar arquitectura hexagonal (Ports & Adapters) en Angular con dominio puro, puertos como interfaces, adaptadores intercambiables e inversión de dependencias.
>
> **Problema que resuelve:** El acoplamiento directo a frameworks (HttpClient, localStorage) impide testear la lógica de negocio aisladamente y dificulta cambiar de proveedor de infraestructura.
>
> **Cómo lo resuelve:** Puertos (interfaces) en dominio puro sin imports de Angular, adaptadores concretos implementan esos puertos, DI con InjectionToken intercambia implementaciones sin modificar consumidores.
>
> **Por qué aprenderlo:** Es la arquitectura que permite testear lógica de negocio sin Angular y cambiar infraestructura sin tocar dominio; estándar en proyectos enterprise grandes.


```mermaid
flowchart TB
    subgraph AD["Adapters"]
        IN34["Inbound (Angular Components)"]
        OUT34["Outbound (API, Storage)"]
    end
    subgraph PT["Ports"]
        P_IN["Inbound Ports"]
        P_OUT["Outbound Ports"]
    end
    subgraph DOM["Domain"]
        ENT["Entities"]
        UC["Use Cases"]
    end
    IN34 --> P_IN --> UC --> ENT
    UC --> P_OUT --> OUT34
```

### Conceptos Clave

- **Puertos** (interfaces): `UserRepository` como interfaz, no implementación
- **Adaptadores**: `HttpUserRepository`, `InMemoryUserRepository`, `MockUserRepository`
- **Dominio puro**: entidades, VO, casos de uso sin dependencias de Angular
- **Casos de uso**: `loginUseCase`, `getProductsUseCase` — orquestan flujos
- **Inversión de dependencias**: depende de abstracciones, no de implementaciones
- **DI con tokens**: `InjectionToken` para cada puerto
- **Testabilidad**: intercambiar adaptadores fácilmente (API local vs remota)
- **Separación**: `core/` (dominio), `infrastructure/` (adaptadores), `application/` (casos de uso)

### Proyecto

Sistema de usuarios con 3 adaptadores intercambiables: InMemory, Http, y Mock. Casos de uso independientes del framework.

### Ejercicios

1. Define puertos como interfaces en `core/ports`
2. Implementa adaptador InMemory y Http para el mismo puerto
3. Crea un caso de uso puro (sin imports de Angular)
4. Configura DI con `InjectionToken` y `useClass`
5. Cambia adaptador sin modificar componentes

### Cómo ejecutar

```bash
cd 34-arquitectura-hexagonal
npm install
ng serve --host 0.0.0.0 --port 8080
```
