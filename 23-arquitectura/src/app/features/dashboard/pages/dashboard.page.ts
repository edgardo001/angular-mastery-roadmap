import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { StatCardComponent } from '../components/stat-card.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [StatCardComponent],
  template: `
    <div class="dashboard">
      <h2>Dashboard</h2>
      <div class="stats">
        <app-stat-card label="Usuarios" [value]="dashboardService.stats().users" />
        <app-stat-card label="Productos" [value]="dashboardService.stats().products" />
        <app-stat-card label="Ingresos" [value]="dashboardService.stats().revenue" />
      </div>
    </div>
  `,
  styles: [`
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
  `]
})
export class DashboardPage implements OnInit {
  constructor(protected readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.loadStats();
  }
}
