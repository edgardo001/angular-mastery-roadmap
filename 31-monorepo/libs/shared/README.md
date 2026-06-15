shared
======

Librería de componentes y servicios compartidos.

```
├── src/
│   ├── lib/
│   │   ├── button/       # Botón reutilizable
│   │   ├── card/         # Tarjeta reutilizable
│   │   └── models/       # Interfaces compartidas
│   └── index.ts          # Barrell export
├── tsconfig.json
└── project.json
```

Para importar desde una app: `import { ButtonComponent } from '@monorepo/shared';`
