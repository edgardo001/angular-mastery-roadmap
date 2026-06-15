import { Injectable, signal, computed, linkedSignal, effect, untracked } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  category: string;
}

export type Filter = 'all' | 'active' | 'completed';

@Injectable({ providedIn: 'root' })
export class TaskStoreService {
  private readonly tasksInternal = signal<Task[]>([]);
  readonly filter = signal<Filter>('all');
  readonly categoryFilter = signal<string>('all');

  readonly editId = linkedSignal<Filter, number | null>({
    source: () => this.filter(),
    computation: () => null,
  });

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

  readonly pendingCount = computed(() => this.tasksInternal().filter(t => !t.completed).length);
  readonly completedCount = computed(() => this.tasksInternal().filter(t => t.completed).length);

  readonly lastAction = signal<string>('');

  constructor() {
    const saved = localStorage.getItem('ng-task-store');
    if (saved) {
      try {
        this.tasksInternal.set(JSON.parse(saved));
      } catch { /* ignore corrupt data */ }
    }

    effect(() => {
      const tasks = this.tasksInternal();
      untracked(() => {
        localStorage.setItem('ng-task-store', JSON.stringify(tasks));
      });
    });
  }

  addTask(title: string, category: string): void {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    this.tasksInternal.update(t => [...t, { id, title, completed: false, category }]);
    this.lastAction.set(`Added "${title}"`);
  }

  removeTask(id: number): void {
    const t = this.tasksInternal().find(x => x.id === id);
    this.tasksInternal.update(tasks => tasks.filter(x => x.id !== id));
    if (t) this.lastAction.set(`Removed "${t.title}"`);
  }

  toggleTask(id: number): void {
    this.tasksInternal.update(tasks =>
      tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
    const t = this.tasksInternal().find(x => x.id === id);
    if (t) this.lastAction.set(`Toggled "${t.title}" — ${t.completed ? 'done' : 'pending'}`);
  }

  updateFilter(filter: Filter): void {
    this.filter.set(filter);
  }

  updateCategoryFilter(category: string): void {
    this.categoryFilter.set(category);
  }
}
