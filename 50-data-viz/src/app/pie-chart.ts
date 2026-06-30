// PieChartComponent: gráfico circular que muestra proporciones
// Un pie chart es como una pizza: cada porción representa un porcentaje del total
import { Component, signal } from '@angular/core';
// BaseChartDirective: directiva de ng2-charts que renderiza gráficos en un canvas
import { BaseChartDirective } from 'ng2-charts';
// ChartConfiguration: tipo de Chart.js que define la configuración del gráfico
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective], // Importamos la directiva para usar [baseChart]
  template: `
    <div class="chart-card">
      <h3>Pie Chart</h3>
      <!-- canvas: elemento HTML donde se dibuja el gráfico -->
      <!-- baseChart: directiva de ng2-charts que conecta Chart.js con Angular -->
      <!-- [data]: datos del gráfico (labels, valores, colores) -->
      <!-- [options]: opciones de configuración (responsive, leyenda, etc.) -->
      <!-- type="pie": tipo de gráfico circular -->
      <canvas baseChart [data]="pieChartData()" [options]="pieChartOptions" type="pie">
      </canvas>
    </div>
  `,
  styles: [`
    .chart-card { background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    h3 { margin-bottom: 1rem; color: #64748b; }
  `]
})
export class PieChartComponent {
  // signal(): datos reactivos del gráfico
  // ChartConfiguration<'pie'>['data']: tipo específico para gráficos circulares
  readonly pieChartData = signal<ChartConfiguration<'pie'>['data']>({
    labels: ['Electronics', 'Clothing', 'Food', 'Books', 'Other'], // Etiquetas de cada porción
    datasets: [{
      data: [35, 25, 20, 12, 8], // Valores numéricos de cada porción
      backgroundColor: ['#6366f1', '#ec4899', '#22c55e', '#f59e0b', '#64748b'], // Colores de cada porción
    }],
  });

  // Opciones de configuración del gráfico
  readonly pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true, // Se adapta al tamaño del contenedor
    plugins: { legend: { position: 'bottom' } } // Leyenda abajo del gráfico
  };
}
