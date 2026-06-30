// ============================================================================
// COMPONENTE RAÍZ DE LA APLICACIÓN (app.component.ts)
// ============================================================================
// Este es el componente principal que se muestra al abrir la aplicación.
// Es como la "pantalla principal" de una app de gestión de tareas.

// Component: Decorador que define un componente Angular.
// Un componente es una pieza de UI con su propio template HTML, estilos y lógica.
import { Component, inject } from '@angular/core';

// FormsModule: Habilita el two-way binding con [(ngModel)].
// Permite que los inputs del formulario se sincronicen con variables del componente.
import { FormsModule } from '@angular/forms';

// TitleCasePipe: Pipe que convierte texto a formato título (primera letra mayúscula).
// Ejemplo: 'work' → 'Work'. Se usa en el template con {{ value | titlecase }}
import { TitleCasePipe } from '@angular/common';

// Importamos nuestro servicio de estado (el "almacén central de tareas")
import { TaskStoreService } from './services/task-store.service';

// @Component: Decorador que convierte una clase TypeScript en un componente Angular
@Component({
  // selector: Nombre HTML que Angular reemplaza por este componente.
  // Ejemplo: <app-root></app-root> se reemplaza por el template de este componente
  selector: 'app-root',

  // standalone: true significa que este componente NO necesita un NgModule padre.
  // Es como una "pieza de LEGO" autosuficiente que no necesita un tablero especial.
  standalone: true,

  // imports: Lista de módulos/componentes que este componente necesita para funcionar.
  // Es como la "lista de herramientas" que el componente necesita.
  imports: [FormsModule, TitleCasePipe],
  template: `
    <div class="app">
      <header class="header">
        <h1>📋 Task Manager</h1>
        <p class="subtitle">Signals & State Management — Angular 22</p>
      </header>

      <main class="main">
        <section class="card add-card">
          <h2>New Task</h2>
          <div class="add-form">
            <input
              type="text"
              [(ngModel)]="newTitle"
              placeholder="Task title..."
              (keyup.enter)="addTask()"
              class="input"
            />
            <select [(ngModel)]="newCategory" class="select">
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
            </select>
            <button class="btn btn-primary" (click)="addTask()">Add</button>
          </div>
        </section>

        <section class="card filters-card">
          <div class="filter-row">
            <span class="label">Status:</span>
            <div class="btn-group">
              @for (f of filters; track f) {
                <button
                  class="btn btn-filter"
                  [class.active]="store.filter() === f"
                  (click)="store.updateFilter(f)"
                >{{ f | titlecase }}</button>
              }
            </div>
          </div>
          <div class="filter-row">
            <span class="label">Category:</span>
            <div class="btn-group">
              <button
                class="btn btn-filter"
                [class.active]="store.categoryFilter() === 'all'"
                (click)="store.updateCategoryFilter('all')"
              >All</button>
              @for (cat of categories; track cat) {
                <button
                  class="btn btn-filter"
                  [class.active]="store.categoryFilter() === cat"
                  (click)="store.updateCategoryFilter(cat)"
                >{{ cat }}</button>
              }
            </div>
          </div>
        </section>

        <section class="card stats-card">
          <div class="stat">
            <span class="stat-value">{{ store.filteredTasks().length }}</span>
            <span class="stat-label">Filtered</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ store.filteredTasks().length - pending }}</span>
            <span class="stat-label">Completed</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ pending }}</span>
            <span class="stat-label">Pending</span>
          </div>
        </section>

        <section class="card list-card">
          <h2>Tasks</h2>
          @if (store.filteredTasks().length === 0) {
            <p class="empty">No tasks match the current filters.</p>
          }
          <ul class="task-list">
            @for (task of store.filteredTasks(); track task.id) {
              <li
                class="task-item"
                [class.editing]="store.editId() === task.id"
                [class.completed]="task.completed"
              >
                <input
                  type="checkbox"
                  [checked]="task.completed"
                  (change)="store.toggleTask(task.id)"
                  class="checkbox"
                />
                @if (store.editId() === task.id) {
                  <input
                    type="text"
                    [value]="task.title"
                    #editInput
                    (blur)="store.editId.set(null)"
                    class="input edit-input"
                  />
                } @else {
                  <span class="task-title" (dblclick)="store.editId.set(task.id)">
                    {{ task.title }}
                  </span>
                }
                <span class="task-category">{{ task.category }}</span>
                <button class="btn btn-icon" (click)="store.removeTask(task.id)" title="Delete">✕</button>
              </li>
            }
          </ul>
        </section>

        <section class="card log-card">
          <h2>Activity Log</h2>
          <p class="log-entry">{{ store.lastAction() || 'No actions yet.' }}</p>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .app { max-width: 720px; margin: 0 auto; padding: 2rem 1rem; }
    .header { text-align: center; margin-bottom: 2rem; }
    .header h1 { font-size: 2rem; color: #1a1a2e; }
    .subtitle { color: #666; font-size: 0.9rem; margin-top: 0.25rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
    .card h2 { font-size: 1rem; font-weight: 600; margin-bottom: 0.75rem; color: #333; }
    .add-form { display: flex; gap: 0.5rem; }
    .input { flex: 1; padding: 0.5rem 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 0.9rem; outline: none; }
    .input:focus { border-color: #4361ee; box-shadow: 0 0 0 2px rgba(67,97,238,0.15); }
    .select { padding: 0.5rem 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 0.9rem; outline: none; background: #fff; }
    .btn { padding: 0.5rem 1rem; border: none; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
    .btn-primary { background: #4361ee; color: #fff; }
    .btn-primary:hover { background: #3a56d4; }
    .btn-icon { background: transparent; color: #999; padding: 0.25rem 0.5rem; font-size: 0.85rem; }
    .btn-icon:hover { color: #e63946; background: rgba(230,57,70,0.1); }
    .filter-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
    .filter-row:last-child { margin-bottom: 0; }
    .label { font-size: 0.85rem; font-weight: 500; color: #555; min-width: 4rem; }
    .btn-group { display: flex; gap: 0.25rem; flex-wrap: wrap; }
    .btn-filter { background: #f0f2f5; color: #555; }
    .btn-filter:hover { background: #e2e5ea; }
    .btn-filter.active { background: #4361ee; color: #fff; }
    .stats-card { display: flex; justify-content: space-around; text-align: center; }
    .stat { display: flex; flex-direction: column; }
    .stat-value { font-size: 1.5rem; font-weight: 700; color: #4361ee; }
    .stat-label { font-size: 0.8rem; color: #888; }
    .empty { color: #999; font-size: 0.9rem; padding: 1rem 0; text-align: center; }
    .task-list { list-style: none; }
    .task-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 0; border-bottom: 1px solid #f0f0f0; transition: background 0.1s; }
    .task-item:last-child { border-bottom: none; }
    .task-item.completed .task-title { text-decoration: line-through; color: #aaa; }
    .task-item.editing { background: #f8f9ff; border-radius: 6px; padding-left: 0.5rem; padding-right: 0.5rem; }
    .checkbox { width: 1.1rem; height: 1.1rem; cursor: pointer; accent-color: #4361ee; }
    .task-title { flex: 1; cursor: default; font-size: 0.95rem; }
    .task-title:hover { color: #4361ee; }
    .edit-input { padding: 0.3rem 0.5rem; }
    .task-category { font-size: 0.75rem; background: #eef0f8; color: #555; padding: 0.2rem 0.5rem; border-radius: 4px; white-space: nowrap; }
    .log-card .log-entry { font-size: 0.85rem; color: #666; font-style: italic; }
  `],
})
// Clase del componente — aquí va la lógica (el "cerebro" del componente)
export class AppComponent {
  // inject(): Función moderna de Angular para obtener servicios.
  // Es como decir "necesito acceso al almacén de tareas" sin usar constructor.
  // Equivale a: constructor(private store: TaskStoreService) {}
  store = inject(TaskStoreService);

  // Variables simples para el formulario de nueva tarea
  newTitle = '';
  newCategory = 'Work';

  // readonly + as const: Crea tuplas inmutables de valores
  // 'all' | 'active' | 'completed' — solo esos tres valores son válidos
  readonly filters = ['all', 'active', 'completed'] as const;
  readonly categories = ['Work', 'Personal', 'Other'];

  // Getter: Propiedad calculada que se recalcula cada vez que se accede
  // Calcula cuántas tareas están pendientes (no completadas)
  get pending() {
    return this.store.filteredTasks().filter(t => !t.completed).length;
  }

  // Método que se ejecuta al enviar el formulario de nueva tarea
  addTask(): void {
    const title = this.newTitle.trim();
    if (!title) return;  // No agregar tareas vacías
    this.store.addTask(title, this.newCategory);
    this.newTitle = '';  // Limpiar el input después de agregar
  }
}
