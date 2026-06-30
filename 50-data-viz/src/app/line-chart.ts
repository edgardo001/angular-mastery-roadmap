// LineChartComponent: gráfico de líneas para mostrar tendencias
// Un line chart conecta puntos para mostrar cómo cambia algo en el tiempo
import { Component, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="chart-card">
      <h3>Line Chart</h3>
      <!-- canvas con gráfico de líneas -->
      <!-- type="line": dibuja líneas conectando los puntos de datos -->
      <canvas baseChart [data]="lineChartData()" [options]="lineChartOptions" type="line">
      </canvas>
    </div>
  `,
  styles: [`
    .chart-card { background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    h3 { margin-bottom: 1rem; color: #64748b; }
  `]
})
export class LineChartComponent {
  readonly lineChartData = signal<ChartConfiguration<'line'>['data']>({
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Eje X (tiempo)
    datasets: [
      {
        label: 'Revenue', // Nombre de la línea en la leyenda
        data: [300, 450, 380, 520], // Valores en el eje Y
        borderColor: '#22c55e', // Color de la línea
        backgroundColor: 'rgba(34,197,94,0.1)', // Color de relleno bajo la línea
        fill: true, // Rellena el área bajo la línea
        tension: 0.4, // Curvatura de la línea (0 = recta, 1 = muy curva)
      },
    ],
  });

  readonly lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: { legend: { display: true } } // Muestra la leyenda
  };
}
