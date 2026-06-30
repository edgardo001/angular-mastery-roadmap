// DashboardComponent: panel de visualización de datos con KPIs y gráficos
// Un dashboard es como un tablero de control: muestra métricas importantes de un vistazo
import { Component } from '@angular/core';
import { BarChartComponent } from './bar-chart';
import { LineChartComponent } from './line-chart';
import { PieChartComponent } from './pie-chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BarChartComponent, LineChartComponent, PieChartComponent],
  template: `
    <div class="dashboard">
      <!-- KPIs: Key Performance Indicators (Indicadores Clave de Rendimiento) -->
      <!-- Son métricas resumidas que muestran el estado del negocio -->
      <div class="kpi-row">
        <div class="kpi-card">
          <span class="kpi-label">Total Revenue</span>
          <span class="kpi-value">$124,500</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Orders</span>
          <span class="kpi-value">1,247</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Customers</span>
          <span class="kpi-value">892</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Growth</span>
          <span class="kpi-value">+12.5%</span>
        </div>
      </div>
      <!-- Fila de gráficos: bar chart y line chart -->
      <div class="charts">
        <app-bar-chart />
        <app-line-chart />
      </div>
      <!-- Fila de gráfico de pie chart -->
      <div class="charts">
        <app-pie-chart />
      </div>
    </div>
  `,
  styles: [`
    .dashboard { max-width: 1000px; margin: 0 auto; padding: 2rem; }
    .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem; }
    .kpi-card { background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .kpi-label { display: block; font-size: 0.875rem; color: #64748b; margin-bottom: 0.5rem; }
    .kpi-value { font-size: 1.5rem; font-weight: 700; color: #0f172a; }
    .charts { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
    @media (max-width: 600px) { .kpi-row, .charts { grid-template-columns: 1fr; } }
  `]
})
export class DashboardComponent {} // Componente sin lógica, solo muestra KPIs y gráficos
