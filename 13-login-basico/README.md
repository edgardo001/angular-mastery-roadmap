## 13 — Login Básico con Servicios + localStorage

Autenticación básica con servicio de señales, localStorage y guard funcional.

> **Propósito:** Implementar autenticación completa con signals, guards funcionales, lazy loading de páginas protegidas y estado de sesión persistente.
>
> **Problema que resuelve:** Sin autenticación, cualquier usuario puede acceder a rutas protegidas y datos sensibles, comprometiendo la seguridad de la aplicación.
>
> **Cómo lo resuelve:** AuthService con signal de estado, efecto localStorage para persistencia, canActivateFn para proteger rutas, y lazy loading para cargar pages de login/dashboard bajo demanda.
>
> **Por qué aprenderlo:** La autenticación es el requisito más común en apps empresariales; este módulo sienta las bases para cualquier sistema de login.


```mermaid
flowchart TB
    FORM["Login Form"] --> SVC["Auth Service"]
    SVC --> API["POST /api/auth/login"]
    API --> VAL{"Credenciales válidas?"}
    VAL -->|Sí| TOKEN["Token de sesión"]
    TOKEN --> STORE["localStorage"]
    STORE --> GUARD["Auth Guard"]
    GUARD --> DASH["Dashboard protegido"]
    VAL -->|No| ERR["Mensaje de error"]
```

### Conceptos Clave

- **Servicio Auth**: estado de sesión con `signal<AuthState>`
- **`canActivateFn`**: guard funcional que verifica autenticación
- **Persistencia**: `localStorage` para token/estado
- **Login/Logout**: formulario reactivo + servicio
- **Rutas protegidas**: redirect a login si no autenticado
- **HttpClient interceptor**: attach token automáticamente
- **Auth signals**: `isLoggedIn`, `currentUser`, `isLoading`

### Proyecto

Login básico con email/contraseña, sesión persistente, dashboard protegido y cierre de sesión.

### Ejercicios

1. Crea `AuthService` con `signal<AuthState>()`
2. Implementa formulario reactivo de login
3. Crea `canActivateFn` para proteger rutas
4. Persiste sesión en `localStorage` con `effect()`
5. Muestra usuario autenticado en navbar

### Cómo ejecutar

```bash
cd 13-login-basico
npm install
ng serve --host 0.0.0.0 --port 8080
```
