libs/
=====

Librerías compartidas entre las aplicaciones del monorepositorio.

Estructura típica:

```
libs/
├── shared/           # Componentes y utilidades compartidas
│   ├── src/
│   │   ├── lib/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   └── models/
│   │   └── index.ts
│   ├── tsconfig.json
│   └── project.json
├── ui/               # Design system
└── utils/            # Funciones auxiliares
```

Las librerías se publican como entrypoints de TypeScript y se consumen via path mappings en tsconfig.
