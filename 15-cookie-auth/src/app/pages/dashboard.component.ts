import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService, Todo } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="dashboard">
      <header class="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          <p class="welcome">Welcome, {{ auth.user()?.name ?? auth.user()?.email }}</p>
        </div>
        <button class="btn-outline" (click)="auth.logout().subscribe()">Logout</button>
      </header>

      <div class="card">
        <h3>Session Status</h3>
        <p><span class="badge badge-success">Active</span> Authenticated via HttpOnly cookie</p>
        <p class="hint">XSRF token is automatically sent with mutating requests</p>
      </div>

      <div class="card">
        <h3>Protected API Data</h3>
        @if (todos.length === 0) {
          <p class="hint">Click load to fetch todos from the protected API</p>
          <button (click)="loadTodos()">Load Todos</button>
        }
        <ul>
          @for (todo of todos; track todo.id) {
            <li [class.done]="todo.completed">{{ todo.title }}</li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { max-width: 600px; margin: 2rem auto; padding: 0 1rem; }
    .dashboard-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
    .welcome { color: #666; margin-top: .25rem; }
    .btn-outline { padding: .5rem 1rem; border: 1px solid #d1d5db; border-radius: 8px; background: #fff; cursor: pointer; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; margin-bottom: 1rem; box-shadow: 0 2px 12px rgba(0,0,0,.08); }
    .card h3 { margin-bottom: .5rem; }
    .badge { display: inline-block; padding: .125rem .5rem; border-radius: 999px; font-size: .75rem; font-weight: 600; }
    .badge-success { background: #d1fae5; color: #065f46; }
    .hint { color: #9ca3af; font-size: .875rem; margin-bottom: .75rem; }
    button { padding: .5rem 1rem; background: #1a1a2e; color: #fff; border: none; border-radius: 8px; cursor: pointer; }
    ul { list-style: none; margin-top: .75rem; }
    li { padding: .5rem 0; border-bottom: 1px solid #f3f4f6; }
    li.done { text-decoration: line-through; color: #9ca3af; }
  `],
})
export class DashboardComponent {
  protected auth = inject(AuthService);
  private api = inject(ApiService);
  protected todos: Todo[] = [];

  loadTodos() {
    this.api.getTodos().subscribe({
      next: (todos) => this.todos = todos,
    });
  }
}
