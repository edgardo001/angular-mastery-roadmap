import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h1>Control Flow en Angular 22</h1>
    <p class="sub">
      Demostración de <code>&#64;if</code>, <code>&#64;for</code>, <code>&#64;switch</code>, <code>&#64;empty</code>
    </p>

    <!-- ─── @if / @else ─── -->
    <section>
      <h2>1. &#64;if / &#64;else</h2>
      <button (click)="toggle()">Mostrar / Ocultar</button>
      @if (show()) {
        <p class="box">Este contenido se muestra condicionalmente</p>
      } @else {
        <p class="box muted">Contenido oculto</p>
      }
    </section>

    <!-- ─── @for + @empty ─── -->
    <section>
      <h2>2. &#64;for con &#64;empty</h2>
      <div class="add-task">
        <input [(ngModel)]="newTask" placeholder="Nueva tarea" (keydown.enter)="addTask()" />
        <button (click)="addTask()">Agregar</button>
      </div>

      @for (task of tasks(); track task.id; let i = $index, e = $even) {
        <div class="task" [class.even]="e">
          <span>{{ i + 1 }}. {{ task.title }}</span>
          <span [class]="task.status">{{ task.status }}</span>
          <button (click)="removeTask(task.id)">✕</button>
        </div>
      } @empty {
        <p class="empty">No hay tareas. ¡Agrega una!</p>
      }

      <p class="count">Total: {{ tasks().length }} tareas</p>
    </section>

    <!-- ─── @switch ─── -->
    <section>
      <h2>3. &#64;switch / &#64;case / &#64;default</h2>
      <select [value]="selectedStatus()" (change)="selectedStatus.set($any($event.target).value)">
        <option value="pending">Pendiente</option>
        <option value="in-progress">En Progreso</option>
        <option value="completed">Completada</option>
      </select>

      @switch (selectedStatus()) {
        @case ('pending') {
          <p class="badge pending">Estado: Pendiente — Esperando inicio</p>
        }
        @case ('in-progress') {
          <p class="badge progress">Estado: En Progreso — Trabajando</p>
        }
        @case ('completed') {
          <p class="badge done">Estado: Completada — ¡Terminado!</p>
        }
        @default {
          <p class="badge">Estado desconocido</p>
        }
      }
    </section>

    <!-- ─── Variables implícitas en @for ─── -->
    <section>
      <h2>4. Variables implícitas ($index, $first, $last, $even, $odd)</h2>
      @for (item of sampleItems; track item; let i = $index, f = $first, l = $last, e = $even, o = $odd) {
        <div class="stats" [class.first]="f" [class.last]="l" [class.even]="e" [class.odd]="o">
          #{{ i }} — first: {{ f }}, last: {{ l }}, even: {{ e }}, odd: {{ o }}
        </div>
      }
    </section>
  `,
  styles: [`
    h1 { text-align: center; margin-bottom: .25rem; }
    .sub { text-align: center; color: #666; margin-bottom: 2rem; font-size: .9rem; }
    code { background: #e8e8e8; padding: .125rem .375rem; border-radius: 4px; }
    section { background: white; border-radius: 10px; padding: 1.25rem; margin-bottom: 1.5rem; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
    h2 { font-size: 1rem; margin-bottom: .75rem; color: #667eea; }
    button { padding: .375rem .75rem; border: none; border-radius: 6px; background: #667eea; color: white; cursor: pointer; font-size: .8rem; }
    button:hover { opacity: .85; }
    .box { padding: .75rem; background: #e3f2fd; border-radius: 6px; margin-top: .5rem; }
    .muted { background: #f5f5f5; color: #999; }
    .add-task { display: flex; gap: .5rem; margin-bottom: .75rem; }
    .add-task input { flex: 1; padding: .5rem; border: 1px solid #ccc; border-radius: 6px; }
    .task { display: flex; align-items: center; gap: .75rem; padding: .5rem .75rem; border-radius: 6px; margin-bottom: .25rem; }
    .task.even { background: #f8f9ff; }
    .task span:last-child { margin-left: auto; font-size: .75rem; padding: .125rem .5rem; border-radius: 99px; }
    .pending { background: #fff3cd; color: #856404; }
    .in-progress { background: #cce5ff; color: #004085; }
    .completed { background: #d4edda; color: #155724; }
    .empty { color: #999; font-style: italic; padding: 1rem; text-align: center; }
    .count { margin-top: .5rem; font-size: .8rem; color: #666; }
    select { padding: .375rem .75rem; border: 1px solid #ccc; border-radius: 6px; }
    .badge { margin-top: .5rem; padding: .5rem 1rem; border-radius: 6px; font-size: .875rem; }
    .badge.pending { background: #fff3cd; color: #856404; }
    .badge.progress { background: #cce5ff; color: #004085; }
    .badge.done { background: #d4edda; color: #155724; }
    .stats { padding: .25rem .5rem; font-size: .8rem; border-radius: 4px; margin-bottom: 2px; }
    .first { background: #e8f5e9; } .last { background: #fce4ec; } .even { } .odd { background: #f5f5f5; }
  `]
})
export class AppComponent {
  readonly show = signal(true);
  readonly tasks = signal<Task[]>([
    { id: 1, title: 'Aprender Angular', status: 'completed' },
    { id: 2, title: 'Crear proyecto', status: 'in-progress' },
  ]);
  readonly selectedStatus = signal<string>('pending');
  newTask = '';

  readonly sampleItems = ['A', 'B', 'C', 'D', 'E'];

  toggle() { this.show.update(v => !v); }

  addTask() {
    if (!this.newTask.trim()) return;
    this.tasks.update(t => [...t, { id: Date.now(), title: this.newTask, status: 'pending' }]);
    this.newTask = '';
  }

  removeTask(id: number) {
    this.tasks.update(t => t.filter(x => x.id !== id));
  }
}
