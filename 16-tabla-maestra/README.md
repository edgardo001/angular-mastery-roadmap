## 16 — Tabla Maestra

Tabla de datos completa: búsqueda, ordenamiento, paginación, y Angular CDK Table.

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
