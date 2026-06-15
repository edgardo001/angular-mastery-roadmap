## 37 — Microfrontends con Module Federation

Microfrontends en Angular con Module Federation: host/remote, comunicación cross-MF, y despliegue independiente.

> **Propósito:** Implementar microfrontends con Module Federation: shell (host) que orquesta remotos, comunicación cross-app y despliegue independiente por equipo.
>
> **Problema que resuelve:** Las SPAs monolíticas crecen hasta ser imposibles de mantener por un solo equipo; el despliegue requiere coordinar a todos los equipos simultáneamente.
>
> **Cómo lo resuelve:** Module Federation (Webpack 5) permite cargar aplicaciones Angular independientes en tiempo de ejecución, cada una con su propio deploy, y un shell las coordina.
>
> **Por qué aprenderlo:** Microfrontends son la evolución natural de microservicios al frontend; permiten escalar equipos independientemente y desplegar sin coordinar releases.

### Conceptos Clave

- **Module Federation**: `@angular-architects/module-federation`, webpack/esbuild
- **Host**: aplicación contenedora que carga remotos
- **Remote**: aplicación expuesta como microfrontend
- **`loadRemoteModule`**: cargar remoto en lazy loading
- **Comunicación**: Event Bus compartido, props, custom events
- **Estado compartido**: librería de estado común (NGXS/NgRx Signals)
- **Routing**: ruteo integrado host + remotos
- **Despliegue independiente**: cada MF con su propio CI/CD
- **Versionado**: estrategias de compatibilidad y version matching

### Proyecto

Shell host + 2 remotos (Dashboard + Admin). Comunicación por Event Bus y estado global compartido. Despliegue independiente.

### Ejercicios

1. Configura Module Federation en proyecto Angular
2. Crea un remote que expone un componente standalone
3. Configura host que carga el remoto dinámicamente
4. Implementa comunicación host-remote con Event Bus
5. Despliega remoto y host por separado en diferentes puertos

### Cómo ejecutar

```bash
cd 37-microfrontends
npm install
# En terminal 1: shell host
ng serve shell
# En terminal 2: remote
ng serve remote
```
