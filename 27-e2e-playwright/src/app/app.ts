// =============================================================================
// ARCHIVO: app.ts
// PROPÓSITO: Componente raíz con app de lista de tareas para testing E2E
// =============================================================================
//
// Este componente implementa una app simple de "Todo List" (lista de tareas)
// diseñada específicamente para ser testeada con Playwright.
//
// ¿Por qué una app de tareas?
// Porque es perfecta para testing E2E: tiene input, botones, lista,
// estados vacíos, y comportamiento dinámico. Cubre los escenarios
// más comunes de una aplicación web real.
//
// Playwright puede:
// 1. Escribir en el input (data-testid="todo-input")
// 2. Hacer clic en el botón (data-testid="add-btn")
// 3. Verificar que el contador actualice (data-testid="counter")
// 4. Marcar tareas como completadas (data-testid="todo-checkbox")
// 5. Verificar el mensaje de estado vacío (data-testid="empty-msg")
// =============================================================================

// Component: Decorador de Angular que define un componente
import { Component, signal } from '@angular/core';

// FormsModule: Habilita Two-Way Binding con ngModel.
// ngModel permite que el input y la variable se sincronicen automáticamente:
// - Cuando escribes en el input, la variable se actualiza
// - Cuando cambias la variable, el input se actualiza
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,

  // FormsModule es necesario para usar [(ngModel)] en el template
  imports: [FormsModule],

  template: `
    <div style="max-width:600px;margin:2rem auto;padding:0 1rem;font-family:system-ui,sans-serif;">
      <!-- 
        data-testid: Atributo especial para testing.
        Playwright usa estos selectores para encontrar elementos:
        page.locator('[data-testid="app-title"]')
        
        Es como poner etiquetas de nombre en los archivos: facilita encontrarlos.
      -->
      <h1 data-testid="app-title" style="color:#1e40af;">Playwright E2E Testing</h1>

      <!-- SECCIÓN DE INPUT -->
      <div style="display:flex;gap:0.5rem;margin:1rem 0;">
        <!-- 
          [(ngModel)]="newTodo": Two-Way Binding (data binding bidireccional)
          - El valor del input se guarda en la variable "newTodo"
          - Si cambias "newTodo" en código, el input se actualiza automáticamente
          
          (keyup.enter)="addTodo()": Event Binding
          - Cuando el usuario presiona Enter en el input, ejecuta addTodo()
          - Es como un botón invisible que se activa con la tecla Enter
        -->
        <input data-testid="todo-input"
          [(ngModel)]="newTodo"
          (keyup.enter)="addTodo()"
          placeholder="Add a todo"
          style="flex:1;padding:0.5rem;border:1px solid #d1d5db;border-radius:4px;">
        
        <!-- Botón que ejecuta addTodo() al hacer clic -->
        <button data-testid="add-btn"
          (click)="addTodo()"
          style="padding:0.5rem 1rem;background:#1e40af;color:white;border:none;border-radius:4px;cursor:pointer;">
          Add
        </button>
      </div>

      <!-- CONTADOR DE ELEMENTOS -->
      <!-- todos().length lee la longitud del array signal -->
      <p data-testid="counter">Items: {{ todos().length }}</p>

      <!-- LISTA DE TAREAS -->
      <ul style="list-style:none;padding:0;">
        <!-- 
          @for: Control flow de Angular que reemplaza *ngFor
          - track todo: Identifica cada elemento por su valor (string único)
          - let i = $index: Obtiene el índice actual (0, 1, 2, ...)
        -->
        @for (todo of todos(); track todo; let i = $index) {
          <li data-testid="todo-item"
            style="display:flex;align-items:center;gap:0.5rem;padding:0.5rem;border-bottom:1px solid #e5e7eb;">
            <!-- 
              Checkbox que al marcarse ELIMINA la tarea (no la marca como completada).
              (change) detecta cuando el checkbox cambia de estado.
              removeTodo(i) elimina el elemento en la posición i del array.
            -->
            <input type="checkbox" [checked]="false" data-testid="todo-checkbox" (change)="removeTodo(i)">
            <span>{{ todo }}</span>
          </li>
        }
      </ul>

      <!-- 
        @if: Control flow de Angular que reemplaza *ngIf.
        Muestra el mensaje SOLO cuando la lista está vacía.
        Es como un letrero que dice "No hay mensajes" cuando tu bandeja está vacía.
      -->
      @if (todos().length === 0) {
        <p data-testid="empty-msg" style="color:#9ca3af;text-align:center;">No todos yet. Add one above!</p>
      }
    </div>
  `
})
export class App {
  // Variable simple para el texto del input (no es signal porque ngModel
  // maneja la sincronización directamente)
  newTodo = '';

  // signal() crea un estado reactivo: cuando cambia, Angular actualiza el template.
  // Contiene la lista de tareas como strings.
  todos = signal<string[]>([]);

  // Agrega una nueva tarea a la lista.
  addTodo() {
    // trim() elimina espacios en blanco al inicio y final
    const text = this.newTodo.trim();
    if (text) {
      // update() modifica el valor del signal de forma segura.
      // Crea un NUEVO array (no muta el original) con el nuevo elemento.
      // [...list, text] es spread operator: copia todos los elementos
      // existentes y agrega el nuevo al final.
      this.todos.update(list => [...list, text]);
      this.newTodo = ''; // Limpia el input después de agregar
    }
  }

  // Elimina una tarea por su posición (índice) en el array.
  removeTodo(index: number) {
    // filter() crea un nuevo array EXCLUYENDO el elemento en la posición index.
    // (_, i) => i !== index: "incluye todos los elementos cuyo ÍNDICE
    // sea diferente al índice que queremos eliminar"
    this.todos.update(list => list.filter((_, i) => i !== index));
  }
}
