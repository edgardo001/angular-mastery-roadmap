import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BffService } from './bff.service';
import { BffDashboardData } from './types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h1>BFF Dashboard</h1>
      @if (loading()) {
        <p class="loading">Loading...</p>
      }
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
      @if (data(); as d) {
        <section class="summary">
          <h2>Summary</h2>
          <div class="cards">
            <div class="card">Orders: {{ d.summary.totalOrders }}</div>
            <div class="card">Revenue: \${{ d.summary.totalRevenue }}</div>
            <div class="card">Low Stock: {{ d.summary.lowStockProducts }}</div>
          </div>
        </section>
        <section>
          <h2>User</h2>
          <p>{{ d.user.name }} — {{ d.user.email }} ({{ d.user.role }})</p>
        </section>
        <section>
          <h2>Orders</h2>
          <ul>
            @for (order of d.orders; track order.id) {
              <li>{{ order.product }} x{{ order.quantity }} — \${{ order.total }} ({{ order.status }})</li>
            }
          </ul>
        </section>
        <section>
          <h2>Products</h2>
          <ul>
            @for (product of d.products; track product.id) {
              <li>{{ product.name }} — \${{ product.price }} (stock: {{ product.stock }})</li>
            }
          </ul>
        </section>
      }
    </div>
  `,
  styles: [`
    .dashboard { max-width: 800px; margin: 0 auto; padding: 2rem; }
    h1 { margin-bottom: 1rem; }
    h2 { margin: 1.5rem 0 0.5rem; color: #64748b; }
    .loading { color: #64748b; font-style: italic; }
    .error { color: #ef4444; }
    .cards { display: flex; gap: 1rem; }
    .card { background: #fff; padding: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); flex: 1; }
    ul { list-style: none; }
    li { padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0; }
  `]
})
export class AppComponent implements OnInit {
  private readonly bff = inject(BffService);
  readonly data = signal<BffDashboardData | null>(null);
  readonly loading = signal(true);
  readonly error = signal('');

  ngOnInit() {
    this.bff.getDashboardData().subscribe({
      next: (d) => { this.data.set(d); this.loading.set(false); },
      error: (e) => { this.error.set(e.message); this.loading.set(false); },
    });
  }
}
