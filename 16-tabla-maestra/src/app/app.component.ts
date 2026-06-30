// ============================================================================
// COMPONENTE DE TABLA MAESTRA (app.component.ts)
// ============================================================================
// Tabla reactiva con búsqueda, ordenamiento y paginación usando signals.
// Es como una "hoja de cálculo inteligente" que se actualiza automáticamente.

// Component: Decorador que define un componente Angular
// computed: Crea valores derivados que se recalculan automáticamente
// signal: Crea estado reactivo
// inject: Para obtener servicios
import { Component, computed, signal, inject } from '@angular/core';

// FormsModule: Habilita [(ngModel)] para two-way binding
import { FormsModule } from '@angular/forms';

// TitleCasePipe: Pipe que convierte texto a formato título ('admin' → 'Admin')
import { TitleCasePipe } from '@angular/common';

// UserService: Para obtener los datos de usuarios
import { UserService } from './services/user.service';

// User: Interfaz que define la forma de un usuario
import type { User } from './models/user.model';

// Tipos para el ordenamiento de columnas
type SortColumn = keyof User | null;  // 'id' | 'name' | 'email' | 'role' | null
type SortDir = 'asc' | 'desc';        // Ascendente o descendente

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, TitleCasePipe],
  template: `
    <div class="container">
      <h1>Tabla Maestra</h1>
      <p class="subtitle">Datos reactivos con Signals — {{ users().length }} usuarios</p>

      <div class="controls">
        <input
          type="text"
          placeholder="Buscar por nombre, email o rol..."
          [ngModel]="searchTerm()"
          (ngModelChange)="onSearch($event)"
        />
        <select [ngModel]="pageSize()" (ngModelChange)="pageSize.set($event)">
          <option [value]="5">5 por página</option>
          <option [value]="10">10 por página</option>
          <option [value]="20">20 por página</option>
        </select>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              @for (col of columns; track col) {
                <th (click)="toggleSort(col)" [class.active]="sortColumn() === col">
                  {{ col | titlecase }}
                  <span class="sort-icon">
                    @if (sortColumn() === col) {
                      {{ sortDir() === 'asc' ? '\u25B2' : '\u25BC' }}
                    }
                  </span>
                </th>
              }
            </tr>
          </thead>
          <tbody>
            @for (user of pagedUsers(); track user.id) {
              <tr>
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td><span class="role-badge" [class]="'role-' + user.role.toLowerCase()">{{ user.role }}</span></td>
              </tr>
            } @empty {
              <tr><td colspan="4" class="empty">No se encontraron usuarios</td></tr>
            }
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <button (click)="prevPage()" [disabled]="currentPage() === 1">Anterior</button>
        <span>Página {{ currentPage() }} de {{ totalPages() }}</span>
        <button (click)="nextPage()" [disabled]="currentPage() === totalPages()">Siguiente</button>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 960px; margin: 0 auto; }
    h1 { margin: 0 0 4px; font-size: 1.75rem; }
    .subtitle { color: #666; margin: 0 0 20px; font-size: 0.9rem; }
    .controls { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
    .controls input { flex: 1; min-width: 200px; padding: 8px 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 0.9rem; }
    .controls select { padding: 8px 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 0.9rem; }
    .table-wrapper { overflow-x: auto; background: #fff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    table { width: 100%; border-collapse: collapse; }
    th { background: #f0f0f0; padding: 10px 14px; text-align: left; cursor: pointer; user-select: none; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; }
    th:hover { background: #e4e4e4; }
    th.active { color: #1976d2; }
    .sort-icon { font-size: 0.75rem; margin-left: 4px; }
    td { padding: 10px 14px; border-top: 1px solid #eee; font-size: 0.9rem; }
    tr:hover td { background: #fafafa; }
    .empty { text-align: center; color: #999; padding: 40px 14px; }
    .role-badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 500; }
    .role-admin { background: #e3f2fd; color: #1565c0; }
    .role-editor { background: #e8f5e9; color: #2e7d32; }
    .role-usuario { background: #fce4ec; color: #c62828; }
    .pagination { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 16px; }
    .pagination button { padding: 6px 16px; border: 1px solid #ccc; border-radius: 6px; background: #fff; cursor: pointer; font-size: 0.85rem; }
    .pagination button:disabled { opacity: 0.4; cursor: default; }
    .pagination button:hover:not(:disabled) { background: #f0f0f0; }
    .pagination span { font-size: 0.85rem; color: #666; }
  `]
})
export class AppComponent {
  private userService = inject(UserService);

  // users: Signal con la lista de usuarios del servicio
  users = this.userService.users;

  // columns: Array de nombres de columnas para la tabla
  columns = ['id', 'name', 'email', 'role'] as const;

  // ===== SIGNALS PARA ESTADO DE LA TABLA =====
  searchTerm = signal('');              // Texto de búsqueda
  sortColumn = signal<SortColumn>(null); // Columna actual de ordenamiento
  sortDir = signal<SortDir>('asc');     // Dirección: ascendente o descendente
  currentPage = signal(1);              // Página actual
  pageSize = signal(10);                // Elementos por página

  // Timer para el debounce de búsqueda (evita buscar en cada tecla)
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  // onSearch(): Búsqueda con debounce de 300ms
  // ANÁLOGÍA: Como cuando escribes en Google y esperas a que dejes de escribir
  // antes de mostrar resultados
  onSearch(value: string) {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.searchTerm.set(value);
      this.currentPage.set(1);  // Volver a la primera página al buscar
    }, 300);
  }

  // toggleSort(): Cambia la columna de ordenamiento
  // Si ya estaba ordenando por esa columna, cambia la dirección (asc/desc)
  // Si era otra columna, ordena ascendente por la nueva columna
  toggleSort(col: (typeof AppComponent.prototype.columns)[number]) {
    if (this.sortColumn() === col) {
      // Misma columna: invertir dirección
      this.sortDir() === 'asc' ? this.sortDir.set('desc') : this.sortDir.set('asc');
    } else {
      // Nueva columna: ordenar ascendente
      this.sortColumn.set(col);
      this.sortDir.set('asc');
    }
  }

  // ===== COMPUTED: VALORES DERIVADOS =====
  // Estos valores se recalculan automáticamente cuando cambian sus dependencias

  // filteredUsers: Filtra usuarios según el término de búsqueda
  // Si no hay término, retorna todos los usuarios
  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.users();
    return this.users().filter(
      (u: User) => u.name.toLowerCase().includes(term) ||
           u.email.toLowerCase().includes(term) ||
           u.role.toLowerCase().includes(term)
    );
  });

  // sortedUsers: Ordena los usuarios filtrados según la columna y dirección
  sortedUsers = computed(() => {
    const col = this.sortColumn();
    const dir = this.sortDir();
    const users = this.filteredUsers();
    if (!col) return users;
    return [...users].sort((a, b) => {
      const va = String(a[col]).toLowerCase();
      const vb = String(b[col]).toLowerCase();
      return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });
  });

  // totalPages: Calcula el número total de páginas
  totalPages = computed(() => Math.max(1, Math.ceil(this.sortedUsers().length / this.pageSize())));

  // pagedUsers: Obtiene solo los usuarios de la página actual
  // slice(start, end): Extrae un segmento del array
  pagedUsers = computed(() => {
    const size = this.pageSize();
    const page = this.currentPage();
    const start = (page - 1) * size;
    return this.sortedUsers().slice(start, start + size);
  });

  // ===== MÉTODOS DE NAVEGACIÓN =====

  // prevPage(): Retrocede una página (mínimo 1)
  prevPage() {
    if (this.currentPage() > 1) this.currentPage.update(p => p - 1);
  }

  // nextPage(): Avanza una página (máximo totalPages)
  nextPage() {
    if (this.currentPage() < this.totalPages()) this.currentPage.update(p => p + 1);
  }
}
