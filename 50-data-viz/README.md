## 50 ÔÇö Data Visualization (Visualizaci├│n de Datos)

Visualizaci├│n de datos con D3.js, ngx-charts, y Chart.js en Angular para dashboards ejecutivos.

> **Prop├│sito:** Visualizar datos en Angular con D3.js y Chart.js: gr├íficos interactivos (barras, l├¡neas, pastel, dispersi├│n), tooltips, animaciones y responsive.
>
> **Problema que resuelve:** Los datos sin visualizaci├│n son dif├¡ciles de interpretar; las tablas de n├║meros no comunican tendencias, outliers ni distribuciones de manera efectiva.
>
> **C├│mo lo resuelve:** D3.js para visualizaciones SVG personalizadas con escalas y ejes, Chart.js para gr├íficos comunes con configuraci├│n declarativa, responsive con ResizeObserver.
>
> **Por qu├® aprenderlo:** Data visualization es cr├¡tica en dashboards empresariales; D3.js + Angular permite gr├íficos personalizados con reactividad y rendimiento ├│ptimo.


```mermaid
flowchart LR
    RAW["Datos crudos"] --> D3["D3.js (scales, axes)"]
    D3 --> SVG["SVG Elements"]
    SVG --> CHART["Gráfico"]
    CHART --> INT["Interactividad"]
    RAW --> CHARTJS["Chart.js"]
    CHARTJS --> CHART
```

### Conceptos Clave

- **ngx-charts**: `@swimlane/ngx-charts`, gr├íficos SVG, se├▒ales para datos
- **Chart.js**: `ng2-charts`, wrappers para Angular con se├▒ales y RxJS
- **D3.js**: selecciones, escalas, ejes, data join, transiciones
- **D3 + Angular**: `@ViewChild` para SVG container, se├▒ales reactivas
- **Gr├íficos**: barras, l├¡neas, circular, radar, heatmap, sparklines
- **Interactividad**: tooltips, zoom, brush, hover states
- **Tiempo real**: datos streaming con D3 transitions y RxJS
- **Responsive**: SVG viewBox, ResizeObserver, se├▒ales de tama├▒o

### Proyecto

Dashboard ejecutivo con KPIs, gr├íficos de barras/l├¡neas/circular, mapa de calor, y datos en tiempo real con D3.

### Ejercicios

1. Crea gr├ífico de barras con ngx-charts y se├▒ales
2. Crea gr├ífico de l├¡neas con Chart.js y datos din├ímicos
3. Implementa gr├ífico circular animado con D3
4. Conecta datos streaming (RxJS) a visualizaci├│n D3
5. Crea un KPI card animado con D3 transitions

### C├│mo ejecutar

```bash
cd 50-data-viz
npm install
ng serve --host 0.0.0.0 --port 8080
```
