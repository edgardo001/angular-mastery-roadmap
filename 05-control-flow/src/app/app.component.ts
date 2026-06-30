/**
 * PROYECTO 05 — Control Flow en Angular
 *
 * Este componente demuestra el NUEVO sistema de control flow de Angular 17+:
 * - @if / @else: renderizado condicional
 * - @for con track: iteración sobre arreglos
 * - @empty: bloque cuando el arreglo está vacío
 * - @switch / @case / @default: selección por valor
 *
 * ANLOGÍA: Piensa en @if/@for/@switch como las instrucciones de un semáforo:
 * - @if = "Si el semáforo está en verde, cruza"
 * - @for = "Para cada auto en la fila, haz algo"
 * - @switch = "Según el color del semáforo, ejecuta una acción"
 *
 * DIFERENCIA CON EL CÓDIGO CLÁSICO:
 * - Antes: *ngIf, *ngFor, *ngSwitch (directivas estructurales)
 * - Ahora: @if, @for, @switch (sintaxis del compilador, más rápido)
 */

import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * Interfaz que define la forma de una tarea.
 * Es como un "molde" que garantiza que cada tarea tenga id, título y estado.
 *
 * El tipo union 'pending' | 'in-progress' | 'completed' restringe
 * los valores posibles del estado a solo esos 3 strings.
 */
interface Task {
  id: number;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
}

/**
 * @Component es un decorador que le dice a Angular:
 * "Esta clase es un componente y debe renderizarse en el DOM"
 *
 * - selector: el tag HTML que representa este componente (<app-root>)
 * - standalone: true significa que NO necesita un NgModule para funcionar
 * - imports: directivas y módulos que el template necesita (FormsModule para ngModel)
 * - template: el HTML que se renderiza
 * - styles: estilos CSS aplicados solo a este componente (encapsulados)
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <!-- Título principal -->
    <h1>Control Flow en Angular 22</h1>
    <p class="sub">
      Demostración de <code>&#64;if</code>, <code>&#64;for</code>, <code>&#64;switch</code>, <code>&#64;empty</code>
    </p>

    <!-- ═══════════════════════════════════════════════════════════════
         SECCIÓN 1: @if / @else
         Renderizado condicional — solo muestra un bloque según una condición
         ═══════════════════════════════════════════════════════════════ -->
    <section>
      <h2>1. &#64;if / &#64;else</h2>
      <!-- Al hacer clic, invierte el valor de show() de true a false o viceversa -->
      <button (click)="toggle()">Mostrar / Ocultar</button>

      <!--
        @if (condición) { ... } @else { ... }
        Es equivalente a un if/else clásico pero DENTRO del template.
        show() es una SIGNAL — una función que retorna un valor reactivo.
        Cuando show() cambia, Angular re-renderiza automáticamente esta sección.
      -->
      @if (show()) {
        <p class="box">Este contenido se muestra condicionalmente</p>
      } @else {
        <p class="box muted">Contenido oculto</p>
      }
    </section>

    <!-- ═══════════════════════════════════════════════════════════════
         SECCIÓN 2: @for con @empty
         Iteración sobre un arreglo + fallback cuando está vacío
         ═══════════════════════════════════════════════════════════════ -->
    <section>
      <h2>2. &#64;for con &#64;empty</h2>

      <!-- Input para agregar nuevas tareas. [(ngModel)] crea binding bidireccional -->
      <div class="add-task">
        <input [(ngModel)]="newTask" placeholder="Nueva tarea" (keydown.enter)="addTask()" />
        <button (click)="addTask()">Agregar</button>
      </div>

      <!--
        @for (item of arreglo; track identificador) { ... } @empty { ... }

        track task.id es OBLIGATORIO en Angular 17+.
        Le dice al Angular cómo identificar cada elemento para re-renderizar
        solo lo que cambió (como un ID único por fila).

        Las variables implícitas ($index, $even, etc.) son como
        "accesorios gratis" que @for te da para cada iteración.
      -->
      @for (task of tasks(); track task.id; let i = $index, e = $even) {
        <div class="task" [class.even]="e">
          <span>{{ i + 1 }}. {{ task.title }}</span>
          <span [class]="task.status">{{ task.status }}</span>
          <button (click)="removeTask(task.id)">✕</button>
        </div>
      } @empty {
        <!-- @empty se muestra cuando tasks() es un arreglo vacío [] -->
        <p class="empty">No hay tareas. ¡Agrega una!</p>
      }

      <p class="count">Total: {{ tasks().length }} tareas</p>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════
         SECCIÓN 3: @switch / @case / @default
         Selección por valor — como un switch/case de JavaScript
         ═══════════════════════════════════════════════════════════════ -->
    <section>
      <h2>3. &#64;switch / &#64;case / &#64;default</h2>

      <!-- Select para elegir un estado. (change) captura el evento nativo del DOM -->
      <select [value]="selectedStatus()" (change)="selectedStatus.set($any($event.target).value)">
        <option value="pending">Pendiente</option>
        <option value="in-progress">En Progreso</option>
        <option value="completed">Completada</option>
      </select>

      <!--
        @switch (valor) { @case ('opcion1') { ... } @default { ... } }
        Evalúa selectedStatus() y renderiza solo el @case que coincida.
        Es como un semáforo: según el color, ejecutas una acción diferente.
      -->
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

    <!-- ═══════════════════════════════════════════════════════════════
         SECCIÓN 4: Variables implícitas de @for
         $index, $first, $last, $even, $odd — como "datos extra" por fila
         ═══════════════════════════════════════════════════════════════ -->
    <section>
      <h2>4. Variables implícitas ($index, $first, $last, $even, $odd)</h2>

      <!--
        let i = $index  → posición actual (0, 1, 2, ...)
        let f = $first  → true solo en el primer elemento
        let l = $last   → true solo en el último elemento
        let e = $even   → true si la posición es par (0, 2, 4, ...)
        let o = $odd    → true si la posición es impar (1, 3, 5, ...)

        Es como las "columnas extra" de una tabla Excel que se calculan solas.
      -->
      @for (item of sampleItems; track item; let i = $index, f = $first, l = $last, e = $even, o = $odd) {
        <div class="stats" [class.first]="f" [class.last]="l" [class.even]="e" [class.odd]="o">
          #{{ i }} — first: {{ f }}, last: {{ l }}, even: {{ e }}, odd: {{ o }}
        </div>
      }
    </section>
  `,
  styles: [`
    /* Estilos globales del componente */
    h1 { text-align: center; margin-bottom: .25rem; }
    .sub { text-align: center; color: #666; margin-bottom: 2rem; font-size: .9rem; }
    code { background: #e8e8e8; padding: .125rem .375rem; border-radius: 4px; }

    /* Cada sección es una "card" blanca con sombra sutil */
    section { background: white; border-radius: 10px; padding: 1.25rem; margin-bottom: 1.5rem; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
    h2 { font-size: 1rem; margin-bottom: .75rem; color: #667eea; }

    /* Botones principales */
    button { padding: .375rem .75rem; border: none; border-radius: 6px; background: #667eea; color: white; cursor: pointer; font-size: .8rem; }
    button:hover { opacity: .85; }

    /* Estados de contenido condicional */
    .box { padding: .75rem; background: #e3f2fd; border-radius: 6px; margin-top: .5rem; }
    .muted { background: #f5f5f5; color: #999; }

    /* Formulario de agregar tarea */
    .add-task { display: flex; gap: .5rem; margin-bottom: .75rem; }
    .add-task input { flex: 1; padding: .5rem; border: 1px solid #ccc; border-radius: 6px; }

    /* Lista de tareas: cada fila se apila verticalmente */
    .task { display: flex; align-items: center; gap: .75rem; padding: .5rem .75rem; border-radius: 6px; margin-bottom: .25rem; }
    .task.even { background: #f8f9ff; }
    .task span:last-child { margin-left: auto; font-size: .75rem; padding: .125rem .5rem; border-radius: 99px; }

    /* Badges de estado: colores como semáforo */
    .pending { background: #fff3cd; color: #856404; }
    .in-progress { background: #cce5ff; color: #004085; }
    .completed { background: #d4edda; color: #155724; }
    .empty { color: #999; font-style: italic; padding: 1rem; text-align: center; }
    .count { margin-top: .5rem; font-size: .8rem; color: #666; }

    /* Select y badges del switch */
    select { padding: .375rem .75rem; border: 1px solid #ccc; border-radius: 6px; }
    .badge { margin-top: .5rem; padding: .5rem 1rem; border-radius: 6px; font-size: .875rem; }
    .badge.pending { background: #fff3cd; color: #856404; }
    .badge.progress { background: #cce5ff; color: #004085; }
    .badge.done { background: #d4edda; color: #155724; }

    /* Stats de variables implícitas */
    .stats { padding: .25rem .5rem; font-size: .8rem; border-radius: 4px; margin-bottom: 2px; }
    .first { background: #e8f5e9; } .last { background: #fce4ec; } .even { } .odd { background: #f5f5f5; }
  `]
})
export class AppComponent {
  /**
   * signal() crea una SIGNAL — una variable reactiva.
   * Cuando su valor cambia, Angular actualiza automáticamente
   * las partes del template que la usan.
   *
   * Es como una caja que "avisa" cuando algo cambia adentro.
   */
  readonly show = signal(true);

  /**
   * Array de tareas tipado con la interfaz Task.
   * Cada vez que se modifique con update(), Angular re-renderiza el @for.
   */
  readonly tasks = signal<Task[]>([
    { id: 1, title: 'Aprender Angular', status: 'completed' },
    { id: 2, title: 'Crear proyecto', status: 'in-progress' },
  ]);

  /** Estado seleccionado actualmente en el @switch */
  readonly selectedStatus = signal<string>('pending');

  /** Modelo para el input de nueva tarea (two-way binding con ngModel) */
  newTask = '';

  /** Items estáticos para demostrar variables implícitas de @for */
  readonly sampleItems = ['A', 'B', 'C', 'D', 'E'];

  /**
   * Invierte el valor booleano de show().
   * update() toma la función callback que recibe el valor actual
   * y retorna el nuevo valor.
   */
  toggle() { this.show.update(v => !v); }

  /**
   * Agrega una nueva tarea al arreglo.
   * La inmutabilidad es clave en signals: siempre creamos un NUEVO array
   * con spread operator [...], nunca mutamos el existente.
   *
   * ANLOGÍA: Es como sacar una fotocopia del array, escribir en la copia,
   * y reemplazar la original. Así Angular sabe que algo cambió.
   */
  addTask() {
    if (!this.newTask.trim()) return; // No agregar vacías
    this.tasks.update(t => [...t, { id: Date.now(), title: this.newTask, status: 'pending' }]);
    this.newTask = ''; // Limpiar input
  }

  /**
   * Elimina una tarea por su ID usando filter().
   * filter() crea un NUEVO array sin el elemento eliminado.
   */
  removeTask(id: number) {
    this.tasks.update(t => t.filter(x => x.id !== id));
  }
}
