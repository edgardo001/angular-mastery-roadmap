/**
 * PÁGINA DEL DASHBOARD (DashboardPage)
 * =====================================
 *
 * Muestra estadísticas clave de la aplicación.
 * Es como el "tablero de control" de una empresa.
 *
 * ANÁLOGÍA: Es como el salpicadero de un auto:
 * - Muestra velocidad (usuarios)
 * - Muestra gasolina (productos)
 * - Muestra temperatura (ingresos)
 *
 * PALABRAS CLAVE:
 * - OnInit: Interfaz que ejecuta código al inicializar el componente
 * - ngOnInit(): Método que se ejecuta DESPUÉS de crear el componente
 * - [value]: Binding de propiedad - pasa datos del padre al hijo
 * - app-stat-card: Componente hijo que muestra una estadística
 *
 * FLUJO:
 * 1. DashboardPage se crea
 * 2. ngOnInit() carga las estadísticas
 * 3. Las estadísticas se pasan a los StatCardComponent
 * 4. Cada StatCard muestra una estadística
 */

// Component, OnInit: Decorador e interfaz del componente
import { Component, OnInit } from '@angular/core';

// Servicio que contiene las estadísticas
import { DashboardService } from '../services/dashboard.service';

// Componente hijo que muestra una estadística
import { StatCardComponent } from '../components/stat-card.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  // StatCardComponent se importa para usarlo en el template
  imports: [StatCardComponent],
  template: `
    <div class="dashboard">
      <h2>Dashboard</h2>
      <div class="stats">
        <!-- [value]: Pasa el dato como input al componente hijo -->
        <!-- dashboardService.stats().users: Lee el valor de la signal -->
        <app-stat-card label="Usuarios" [value]="dashboardService.stats().users" />
        <app-stat-card label="Productos" [value]="dashboardService.stats().products" />
        <app-stat-card label="Ingresos" [value]="dashboardService.stats().revenue" />
      </div>
    </div>
  `,
  styles: [`
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
  `]
})
// OnInit: Interfaz que obliga a implementar ngOnInit()
export class DashboardPage implements OnInit {
  // protected: Visible en el template pero no fuera del componente
  constructor(protected readonly dashboardService: DashboardService) {}

  // ngOnInit(): Se ejecuta DESPUÉS de crear el componente
  // Es como el "arranque" del componente
  ngOnInit(): void {
    // Carga las estadísticas del servidor
    this.dashboardService.loadStats();
  }
}
