apps/
=====

Cada subdirectorio dentro de `apps/` es una aplicación independiente del monorepositorio.

Estructura típica:

```
apps/
├── my-app/          # Aplicación principal
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── main.ts
│   │   └── index.html
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   └── project.json
└── admin-app/       # Aplicación de administración
    └── ...
```

Cada app tiene su propia configuración de compilación y despliegue.
