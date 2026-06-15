## 13 — Login Básico con Servicios + localStorage

Autenticación básica con servicio de señales, localStorage y guard funcional.

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
ng serve
```
