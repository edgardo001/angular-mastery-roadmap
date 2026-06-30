// BarChartComponent: gráfico de barras para comparar cantidades
// Un bar chart usa barras verticales para mostrar valores de diferentes categorías
import { Component, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="chart-card">
      <h3>Bar Chart</h3>
      <!-- canvas con gráfico de barras -->
      <!-- type="bar": dibuja barras verticales para cada dato -->
      <canvas baseChart [data]="barChartData()" [options]="barChartOptions" type="bar">
      </canvas>
    </div>
  `,
  styles: [`
    .chart-card { background: #fff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    h3 { margin-bottom: 1rem; color: #64748b; }
  `]
})
export class BarChartComponent {
  readonly barChartData = signal<ChartConfiguration<'bar'>['data']>({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Nombres de cada barra
    datasets: [{
      label: 'Sales', // Nombre del dataset (aparece en tooltips)
      data: [65, 59, 80, 81, 56, 95], // Altura de cada barra
      backgroundColor: '#6366f1', // Color de las barras
      borderRadius: 6, // Bordes redondeados de las barras
    }],
  });

  readonly barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: { legend: { display: false } } // Ocultamos leyenda (solo hay un dataset)
  };
}
