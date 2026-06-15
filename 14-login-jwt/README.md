## 14 — Autenticación JWT Completa

JWT con access y refresh tokens, interceptor de autenticación, renovación automática, guards de roles.

### Conceptos Clave

- **JWT**: access token (corto) + refresh token (largo)
- **`HttpInterceptorFn`**: attach Bearer token a cada petición
- **Refresh flow**: interceptor detecta 401, renueva token, reintenta
- **Decodificación**: `jwtDecode` para leer payload sin verificar
- **`canActivateFn`**: guard con verificación de rol
- **`canMatchFn`**: guard para rutas específicas por rol
- **Login/Register**: formularios reactivos con validación
- **Backends**: Spring Boot 4.1.0, .NET 10 o FastAPI (uno a elegir en backend/)

### Proyecto

Auth completo con login, registro, dashboard por rol (admin/user), refresh automático y logout.

### Ejercicios

1. Configura interceptor JWT para attach token
2. Implementa refresh automático en interceptor
3. Crea `canActivateFn` con verificación de rol
4. Decodifica JWT para obtener datos del usuario
5. Maneja expiración de sesión con redirect a login

### Cómo ejecutar

```bash
cd 14-login-jwt
npm install
ng serve
```
