## 09 — Dependency Injection

Sistema de inyección de dependencias de Angular: jerarquía, providers, injection tokens, y la función `inject()`.

### Conceptos Clave

- **`@Injectable()`**: decorador de servicios, `providedIn: 'root'`
- **`inject()`**: función para obtener dependencias (alternativa a constructor DI)
- **`InjectionToken<T>`**: tokens para valores no-clase
- **Providers**: `useClass`, `useValue`, `useFactory`, `useExisting`
- **Jerarquía**: `EnvironmentInjector`, `ElementInjector`, resolución jerárquica
- **`@Optional()`**: dependencias opcionales
- **`@Host()`**: límite de resolución al inyector actual
- **`@Self()`**: solo el inyector del propio elemento
- **`@SkipSelf()`**: salta el inyector del propio elemento
- **`runInInjectionContext()`**: ejecutar fuera del contexto de DI

### Proyecto

Sistema de configuración multi-tenant con tokens de inyección, providers por entorno y servicios jerárquicos.

### Ejercicios

1. Define un `InjectionToken<AppConfig>` para configuración global
2. Crea un servicio con `providedIn: 'root'` y otro con `providedIn: 'platform'`
3. Usa `inject()` en lugar de constructor DI
4. Implementa un `useFactory` provider con dependencias
5. Crea un `EnvironmentInjector` para contexto aislado

### Cómo ejecutar

```bash
cd 09-dependency-injection
npm install
ng serve
```
