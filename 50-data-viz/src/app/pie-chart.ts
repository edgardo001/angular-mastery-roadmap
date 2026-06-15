import { Component, signal } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="chart-card">
      <h3>Pie Chart</h3>
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
  readonly pieChartData = signal<ChartConfiguration<'pie'>['data']>({
    labels: ['Electronics', 'Clothing', 'Food', 'Books', 'Other'],
    datasets: [{
      data: [35, 25, 20, 12, 8],
      backgroundColor: ['#6366f1', '#ec4899', '#22c55e', '#f59e0b', '#64748b'],
    }],
  });

  readonly pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } },
  };
}
