// ============================================================================
// SERVICIO DE ESTADO CON SIGNALS (task-store.service.ts)
// ============================================================================
// Este archivo demuestra cómo usar Angular Signals para manejar el estado
// de una aplicación. Es como un "almacén central" donde se guarda la lista
// de tareas y todos los componentes pueden leer y modificar esos datos.
//
// ANÁLOGÍA DEL MUNDO REAL:
// Imagina una pizarra compartida en una oficina. Cada empleado (componente)
// puede leer lo que hay en la pizarra, y cuando alguien la modifica,
// todos los demás lo ven inmediatamente. Eso es un Signal.

// IMPORTACIONES DE ANGULAR CORE:
// - Injectable: Decorador que permite que Angular inyecte este servicio en otros componentes
// - signal: Crea una señal reactiva que notifica cuando su valor cambia
// - computed: Crea un valor derivado que se recalcula automáticamente cuando sus dependencias cambian
// - linkedSignal: Signal que se resetea cuando cambia otra señal (nuevo en Angular 19+)
// - effect: Ejecuta código cada vez que cambian las señales que lee
// - untracked: Permite leer una señal SIN crear una dependencia (evita re-ejecución del effect)
import { Injectable, signal, computed, linkedSignal, effect, untracked } from '@angular/core';

// Interface que define la forma de una tarea
// Es como un "molde" que dice qué datos tiene cada tarea
export interface Task {
  id: number;
  title: string;
  completed: boolean;
  category: string;
}

// Type alias: Define los valores posibles para el filtro
// 'all' | 'active' | 'completed' significa: solo puede ser uno de esos tres valores
export type Filter = 'all' | 'active' | 'completed';

// @Injectable: Decorador que convierte esta clase en un servicio inyectable
// providedIn: 'root' significa que Angular crea UNA sola instancia (singleton)
// Es como tener UNA pizarra para toda la oficina, no una por cada empleado
@Injectable({ providedIn: 'root' })
export class TaskStoreService {
  // signal<Task[]>([]): Crea un signal que guarda un array de tareas.
  // El valor inicial es un array vacío [].
  // Es como poner la pizarra en blanco al principio del día.
  private readonly tasksInternal = signal<Task[]>([]);

  // Signal público para el filtro de estado (all/active/completed)
  readonly filter = signal<Filter>('all');

  // Signal público para el filtro de categoría
  readonly categoryFilter = signal<string>('all');

  // linkedSignal: Signal especial que se RESETEA cuando cambia su "source".
  // Cuando el usuario cambia el filtro de estado, se borra el ID de edición.
  // ANÁLOGÍA: Si cambias de página en un libro, se cierra el marcador de la página anterior.
  readonly editId = linkedSignal<Filter, number | null>({
    source: () => this.filter(),  // Fuente: el filtro actual
    computation: () => null,       // Cuando cambia, resetea a null
  });

  // computed: Valor DERIVADO que se recalcula automáticamente.
  // Lee tasksInternal, categoryFilter y filter.
  // Si cualquiera de ellos cambia, filteredTasks se recalcula.
  // ANÁLOGÍA: Es como un empleado que revisa la pizarra y filtra las tareas
  // según los criterios seleccionados.
  readonly filteredTasks = computed(() => {
    const tasks = this.tasksInternal();
    const cat = this.categoryFilter();
    const f = this.filter();
    return tasks.filter(t => {
      if (cat !== 'all' && t.category !== cat) return false;
      if (f === 'active') return !t.completed;
      if (f === 'completed') return t.completed;
      return true;
    });
  });

  // Otros computed que derivan datos del array principal
  readonly pendingCount = computed(() => this.tasksInternal().filter(t => !t.completed).length);
  readonly completedCount = computed(() => this.tasksInternal().filter(t => t.completed).length);

  // Signal simple para mostrar la última acción realizada
  readonly lastAction = signal<string>('');

  // El constructor se ejecuta UNA VEZ cuando Angular crea el servicio.
  // Aquí cargamos datos guardados y configuramos la persistencia automática.
  constructor() {
    // Cargar tareas guardadas del localStorage al iniciar
    // ANÁLOGÍA: Al llegar a la oficina, revisas si quedaron tareas anotadas de ayer
    const saved = localStorage.getItem('ng-task-store');
    if (saved) {
      try {
        this.tasksInternal.set(JSON.parse(saved));
      } catch { /* ignore corrupt data */ }
    }

    // effect(): Efecto secundario que se ejecuta cuando cambian las señales que lee.
    // Cada vez que tasksInternal cambia, este effect guarda los datos en localStorage.
    // ANÁLOGÍA: Como un empleado que siempre anota en la pizarra lo que se modifica,
    // para que no se pierda el registro.
    effect(() => {
      const tasks = this.tasksInternal();
      // untracked: Lee localStorage SIN crear una dependencia.
      // Así, el effect solo se re-ejecuta cuando tasksInternal cambia,
      // no cuando cambiamos localStorage.
      untracked(() => {
        localStorage.setItem('ng-task-store', JSON.stringify(tasks));
      });
    });
  }

  // ===== MÉTODOS PARA MODIFICAR EL ESTADO =====

  // Agrega una nueva tarea al signal
  // update(): Modifica el valor del signal basándose en el valor anterior
  // Es como agregar una nota adicional a la pizarra
  addTask(title: string, category: string): void {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    // spread operator (...) copia el array anterior y agrega la nueva tarea
    this.tasksInternal.update(t => [...t, { id, title, completed: false, category }]);
    this.lastAction.set(`Added "${title}"`);
  }

  // Elimina una tarea por su ID usando filter() para crear un nuevo array sin ella
  removeTask(id: number): void {
    const t = this.tasksInternal().find(x => x.id === id);
    this.tasksInternal.update(tasks => tasks.filter(x => x.id !== id));
    if (t) this.lastAction.set(`Removed "${t.title}"`);
  }

  // Cambia el estado completed de una tarea usando map()
  // map() crea un nuevo array donde solo la tarea seleccionada cambia
  toggleTask(id: number): void {
    this.tasksInternal.update(tasks =>
      tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
    const t = this.tasksInternal().find(x => x.id === id);
    if (t) this.lastAction.set(`Toggled "${t.title}" — ${t.completed ? 'done' : 'pending'}`);
  }

  // Actualiza el filtro de estado (all/active/completed)
  updateFilter(filter: Filter): void {
    this.filter.set(filter);
  }

  // Actualiza el filtro de categoría
  updateCategoryFilter(category: string): void {
    this.categoryFilter.set(category);
  }
}
