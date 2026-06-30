// DashboardComponent: panel de visualización de datos con KPIs y gráficos
// Un dashboard es como un tablero de control: muestra métricas importantes de un vistazo
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D3BarChartComponent } from './d3-bar-chart';
import { D3LineChartComponent } from './d3-line-chart';
import { D3PieChartComponent } from './d3-pie-chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, D3BarChartComponent, D3LineChartComponent, D3PieChartComponent],
  template: `
    <div class="dashboard">
      <h1>📊 Dashboard de Data Visualization</h1>

      <!-- KPIs: Key Performance Indicators (Indicadores Clave de Rendimiento) -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <span class="kpi-value">{{ totalUsers | number }}</span>
          <span class="kpi-label">Usuarios Totales</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-value">{{ totalRevenue | currency }}</span>
          <span class="kpi-label">Ingresos</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-value">{{ conversionRate }}%</span>
          <span class="kpi-label">Conversión</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-value">{{ satisfaction }}</span>
          <span class="kpi-label">Satisfacción</span>
        </div>
      </div>

      <!-- Sección D3.js -->
      <h2 class="section-title">📈 Visualizaciones con D3.js</h2>
      <p class="section-desc">D3.js da control total sobre cada elemento SVG. Ideal para visualizaciones personalizadas.</p>

      <div class="chart-grid">
        <app-d3-bar-chart
          [data]="barData"
          title="Ventas por Mes (D3)" />

        <app-d3-line-chart
          [data]="lineData"
          title="Crecimiento de Usuarios (D3)" />

        <app-d3-pie-chart
          [data]="pieData"
          title="Distribución de Categorías (D3)" />
      </div>
    </div>
  `,
  styles: [`
    .dashboard { padding: 20px; }
    .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 30px; }
    .kpi-card { background: linear-gradient(135deg, #1a73e8, #1557b0); color: white; padding: 20px; border-radius: 12px; text-align: center; }
    .kpi-value { display: block; font-size: 28px; font-weight: bold; }
    .kpi-label { display: block; margin-top: 8px; opacity: 0.9; }
    .section-title { color: #1a1a2e; margin-top: 40px; }
    .section-desc { color: #666; margin-bottom: 20px; }
    .chart-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; }
  `],
})
export class DashboardComponent {
  // KPIs
  totalUsers = 12847;
  totalRevenue = 284500;
  conversionRate = 3.2;
  satisfaction = '4.8 ⭐';

  // Datos para gráfico de barras D3
  barData = [
    { label: 'Ene', value: 65 },
    { label: 'Feb', value: 59 },
    { label: 'Mar', value: 80 },
    { label: 'Abr', value: 81 },
    { label: 'May', value: 56 },
    { label: 'Jun', value: 95 },
  ];

  // Datos para gráfico de líneas D3
  lineData = [
    { month: 'Ene', value: 300 },
    { month: 'Feb', value: 450 },
    { month: 'Mar', value: 380 },
    { month: 'Abr', value: 520 },
    { month: 'May', value: 610 },
    { month: 'Jun', value: 580 },
  ];

  // Datos para gráfico circular D3
  pieData = [
    { label: 'Electrónica', value: 35, color: '#1a73e8' },
    { label: 'Ropa', value: 25, color: '#e94560' },
    { label: 'Hogar', value: 20, color: '#0f3460' },
    { label: 'Deportes', value: 12, color: '#16213e' },
    { label: 'Otros', value: 8, color: '#533483' },
  ];
}
