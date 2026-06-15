import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div style="max-width:600px;margin:2rem auto;padding:0 1rem;font-family:system-ui,sans-serif;">
      <h1 data-testid="app-title" style="color:#1e40af;">Playwright E2E Testing</h1>

      <div style="display:flex;gap:0.5rem;margin:1rem 0;">
        <input data-testid="todo-input"
          [(ngModel)]="newTodo"
          (keyup.enter)="addTodo()"
          placeholder="Add a todo"
          style="flex:1;padding:0.5rem;border:1px solid #d1d5db;border-radius:4px;">
        <button data-testid="add-btn"
          (click)="addTodo()"
          style="padding:0.5rem 1rem;background:#1e40af;color:white;border:none;border-radius:4px;cursor:pointer;">
          Add
        </button>
      </div>

      <p data-testid="counter">Items: {{ todos().length }}</p>

      <ul style="list-style:none;padding:0;">
        @for (todo of todos(); track todo; let i = $index) {
          <li data-testid="todo-item"
            style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem;border-bottom:1px solid #e5e7eb;">
            <input type="checkbox" [checked]="false" data-testid="todo-checkbox" (change)="removeTodo(i)">
            <span>{{ todo }}</span>
          </li>
        }
      </ul>

      @if (todos().length === 0) {
        <p data-testid="empty-msg" style="color:#9ca3af;text-align:center;">No todos yet. Add one above!</p>
      }
    </div>
  `
})
export class App {
  newTodo = '';
  todos = signal<string[]>([]);

  addTodo() {
    const text = this.newTodo.trim();
    if (text) {
      this.todos.update(list => [...list, text]);
      this.newTodo = '';
    }
  }

  removeTodo(index: number) {
    this.todos.update(list => list.filter((_, i) => i !== index));
  }
}
