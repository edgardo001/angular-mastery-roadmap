import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly _stats = signal({
    users: 0,
    products: 0,
    revenue: 0,
  });
  readonly stats = this._stats.asReadonly();

  loadStats(): void {
    this._stats.set({ users: 150, products: 42, revenue: 12500 });
  }
}
