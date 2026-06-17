## 16 — Tabla Maestra

Tabla de datos completa: búsqueda, ordenamiento, paginación, y Angular CDK Table.

> **Propósito:** Construir tablas de datos completas con búsqueda, ordenamiento multi-columna, paginación y virtual scrolling usando Angular CDK/Material y señales.
>
> **Problema que resuelve:** Las tablas HTML básicas no soportan búsqueda, ordenamiento ni paginación; implementar esto manualmente resulta en código frágil y mal rendimiento con grandes datasets.
>
> **Cómo lo resuelve:** CdkTable/MatTable con señales para datos y filtros, computed para ordenamiento, paginación con signal de configuración, y virtual scrolling del CDK para +1000 filas.
>
> **Por qué aprenderlo:** Las tablas de datos son el componente UI más usado en apps empresariales; dominar su implementación es indispensable para dashboards y paneles de administración.


```mermaid
flowchart LR
    API["API REST"] --> SVC["Data Service"]
    SVC --> SIG["signal"]
    SIG --> TBL["Tabla Maestra"]
    TBL --> SORT["Ordenar"]
    TBL --> FILTER["Filtrar"]
    TBL --> PAGE["Paginación"]
    TBL --> SEARCH["Buscar"]
```

### Conceptos Clave

- **`@angular/cdk/table`**: `CdkTable`, columnas dinámicas
- **`@angular/material/table`**: `MatTable`, `MatSort`, `MatPaginator`
- **Señales para tabla**: datos como `signal<User[]>`, filtros como `signal<string>`
- **Ordenamiento**: `computed` para ordenar datos por columna
- **Búsqueda**: filtro con `debounceTime` y señales
- **Paginación**: `signal<PageConfig>`, `computed` para slice de datos
- **Virtual scrolling**: `@angular/cdk/scrolling` para grandes datasets
- **Columnas dinámicas**: `displayedColumns` como señal

### Proyecto

Tabla de usuarios con búsqueda en vivo, ordenamiento multi-columna, paginación cliente/servidor y scroll virtual.

### Ejercicios

1. Crea una tabla con `CdkTable` y datos como señal
2. Implementa ordenamiento por columna con `computed`
3. Añade búsqueda con debounce usando RxJS + señales
4. Implementa paginación (cliente y servidor)
5. Agrega virtual scrolling para +1000 filas

### Cómo ejecutar

```bash
cd 16-tabla-maestra
npm install
ng serve
```
