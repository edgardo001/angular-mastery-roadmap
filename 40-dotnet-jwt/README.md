## 40 ÔÇö .NET 10 + JWT + Angular

Backend empresarial con .NET 10 y JWT. Dos modos: Angular servido desde .NET y frontend separado.

> **Prop├│sito:** Construir un backend enterprise con .NET 10 + JWT + Angular: ASP.NET Core Identity, JWT bearer, Entity Framework y Docker.
>
> **Problema que resuelve:** .NET es el backend est├índar en grandes corporaciones; sin ejemplos de integraci├│n JWT con Angular, los equipos .NET carecen de referencia actualizada.
>
> **C├│mo lo resuelve:** ASP.NET Core con JWT bearer authentication, Identity para gesti├│n de usuarios, Entity Framework para base de datos, y Docker Compose para despliegue.
>
> **Por qu├® aprenderlo:** .NET + Angular es el stack enterprise por excelencia en el mundo Windows/ Azure; dominar esta integraci├│n abre puertas en consultoras y grandes empresas.


```mermaid
flowchart TB
    ANG_DN["Angular"] --> POST_DN["POST /api/auth/login"]
    POST_DN --> ID["ASP.NET Core Identity"]
    ID --> EF["Entity Framework Core"]
    EF --> JWT_DN["JWT Bearer Token"]
    JWT_DN --> ANG_DN
    ANG_DN --> REQ_DN["Request con Authorization header"]
    REQ_DN --> MID["JWT Middleware"]
    MID -->|válido| API_DN["API protegida"]
    MID -->|inválido| ERR_DN["401"]
```

### Conceptos Clave

- **.NET 10**: Minimal APIs, `MapGroup`, `TypedResults`
- **JWT**: `Microsoft.AspNetCore.Authentication.JwtBearer`
- **Identity**: `Microsoft.AspNetCore.Identity`, roles, claims
- **Pol├¡ticas**: `AddPolicy`, `RequireRole`, `RequireClaim`
- **Refresh tokens**: `RefreshToken` entity, rotaci├│n, revocaci├│n
- **Modo integrado**: Angular build en `wwwroot/`, `UseStaticFiles()`, `UseSpa()`
- **Modo separado**: .NET API + Angular con CORS
- **Entity Framework Core**: migrations, SQL Server / PostgreSQL
- **Docker**: Dockerfile multi-stage, docker-compose .NET + Angular + SQL Server

### Proyecto

API REST con .NET 10 + JWT + Angular. Ambos modos de despliegue: integrado y separado.

### Ejercicios

1. Configura JWT Bearer authentication en .NET 10
2. Implementa endpoints login/refresh/register con Minimal APIs
3. Conecta Angular con interceptor JWT
4. Integra Angular en .NET con StaticFiles + SPA
5. Despliega con Docker Compose (.NET + Angular + SQL Server)

### C├│mo ejecutar

```bash
cd 40-dotnet-jwt
# Modo separado: backend + frontend
docker compose up
```

### Archivos del Proyecto

| Archivo | Stack | Propósito |
|---------|-------|-----------|
| `README.md` | Raíz | Documentación del proyecto |
| `angular.json` | Frontend | Configuración del workspace Angular |
| `package.json` | Frontend | Dependencias y scripts del frontend |
| `tsconfig.json` | Frontend | Configuración base de TypeScript |
| `tsconfig.app.json` | Frontend | Configuración de TypeScript para la app |
| `package-lock.json` | Frontend | Bloqueo de versiones de dependencias |
| `proxy.conf.json` | Frontend | Configuración de proxy para desarrollo |
| `src/index.html` | Frontend | HTML principal de la aplicación |
| `src/main.ts` | Frontend | Punto de entrada de la aplicación |
| `src/styles.css` | Frontend | Estilos globales |
| `src/app/app.config.ts` | Frontend | Configuración de providers de Angular |
| `src/app/app.component.ts` | Frontend | Componente raíz de la aplicación |
| `src/app/app.routes.ts` | Frontend | Configuración de rutas |
| `src/app/auth.service.ts` | Frontend | Servicio de autenticación JWT |
| `src/app/jwt.interceptor.ts` | Frontend | Interceptor HTTP que adjunta token JWT |
| `backend/DotnetJwt.csproj` | Backend | Archivo de proyecto .NET |
| `backend/Program.cs` | Backend | Punto de entrada de la API .NET |
| `backend/appsettings.json` | Backend | Configuración de la aplicación .NET |
| `backend/Controllers/AuthController.cs` | Backend | Controlador de autenticación |
| `backend/Models/LoginRequest.cs` | Backend | Modelo de solicitud de login |
| `backend/Models/User.cs` | Backend | Modelo de entidad User |
| `backend/Services/JwtService.cs` | Backend | Servicio de generación/validación JWT |
