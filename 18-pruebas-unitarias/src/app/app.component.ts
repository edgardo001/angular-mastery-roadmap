/**
 * COMPONENTE PRINCIPAL DE LA CALCULADORA (AppComponent)
 * =====================================================
 *
 * Este es el COMPONENTE RAÍZ de la aplicación. Un componente en Angular
 * es como una "pieza de LEGO" que tiene su propio template (HTML),
 * estilos (CSS) y lógica (TypeScript).
 *
 * ANÁLOGÍA: Es como una caja de herramientas. Tiene:
 * - Un display donde ves el resultado (template)
 * - Botones para interactuar (eventos)
 * - Lógica para calcular (métodos)
 *
 * PALABRAS CLAVE:
 * - @Component: Decorador que define un componente Angular
 * - selector: Nombre del componente para usarlo en HTML (<app-root>)
 * - standalone: true: El componente NO necesita un módulo NgModule
 * - imports: Componentes/pipes que este componente usa
 * - template: El HTML del componente (puede ser inline o archivo externo)
 * - styles: Los estilos CSS del componente
 * - inject(): Forma moderna de obtener servicios (reemplaza constructor)
 * - [(ngModel)]: Two-way binding - sincroniza input con variable
 * - (click): Evento que se ejecuta al hacer clic en un botón
 * - @if: Nuevo syntax de control flow de Angular 17+
 * - {{ }}: Interpolación - muestra valores en el template
 */

// Component: Decorador que marca esta clase como un componente Angular
// inject: Permite obtener servicios sin usar constructor
import { Component, inject } from '@angular/core';

// FormsModule: Necesario para usar [(ngModel)] (two-way data binding)
import { FormsModule } from '@angular/forms';

// El servicio calculadora que contiene la lógica matemática
import { CalculatorService } from './calculator.service';

// @Component: Decorador que define las propiedades del componente
@Component({
  // selector: Nombre CSS para usar este componente en HTML
  // Se usa como <app-root></app-root> en el template padre
  selector: 'app-root',

  // standalone: true significa que este componente es autocontenido
  // No necesita ser declarado en un NgModule (forma moderna de Angular)
  standalone: true,

  // imports: Lista de componentes/pipes que este componente necesita
  // FormsModule habilita [(ngModel)] para two-way binding
  imports: [FormsModule],

  // template: El HTML que se renderiza en pantalla
  // Nota: usa template inline (no archivo externo)
  template: `
    <div class="app">
      <header class="header">
        <h1>Calculadora</h1>
        <p class="subtitle">Pruebas Unitarias — Angular 22</p>
      </header>

      <main class="main">
        <section class="card">
          <!-- input-row: Fila de entrada de datos -->
          <div class="input-row">
            <!-- [(ngModel)]: Two-way binding -->
            <!-- "a" es una propiedad del componente, el input la modifica -->
            <!-- Cuando "a" cambia, el input se actualiza y viceversa -->
            <input type="number" [(ngModel)]="a" class="input" placeholder="First number" />

            <!-- select con ngModel: Elige la operación matemática -->
            <select [(ngModel)]="operation" class="select">
              <option value="add">+</option>
              <option value="subtract">−</option>
              <option value="multiply">×</option>
              <option value="divide">÷</option>
            </select>

            <input type="number" [(ngModel)]="b" class="input" placeholder="Second number" />
          </div>

          <!-- Botones de acción -->
          <div class="actions">
            <!-- (click): Evento que ejecuta calculate() al hacer clic -->
            <button class="btn btn-primary" (click)="calculate()">Calculate</button>
            <button class="btn btn-secondary" (click)="clear()">Clear</button>
          </div>

          <!-- @if: Nuevo syntax de Angular para mostrar/ocultar elementos -->
          <!-- Solo se muestra si "error" tiene contenido -->
          @if (error) {
            <div class="error">{{ error }}</div>
          }

          <!-- Mostrar resultado de la operación -->
          <div class="result-row">
            <span class="result-label">Result:</span>
            <!-- service.result() lee el valor de la signal -->
            <span class="result-value">{{ service.result() }}</span>
          </div>

          <!-- Mostrar última operación realizada -->
          <div class="history-row">
            <span class="result-label">Last op:</span>
            <!-- Si no hay operación, muestra "—" -->
            <span class="history-value">{{ service.lastOperation() || '—' }}</span>
          </div>
        </section>
      </main>
    </div>
  `,
  // styles: Estilos CSS del componente (scope limitado a este componente)
  styles: [`
    .app { max-width: 480px; margin: 0 auto; padding: 2rem 1rem; }
    .header { text-align: center; margin-bottom: 2rem; }
    .header h1 { font-size: 2rem; color: #1a1a2e; }
    .subtitle { color: #666; font-size: 0.9rem; margin-top: 0.25rem; }
    .card { background: #fff; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
    .input-row { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1rem; }
    .input { flex: 1; padding: 0.5rem 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 0.9rem; outline: none; }
    .input:focus { border-color: #4361ee; box-shadow: 0 0 0 2px rgba(67,97,238,0.15); }
    .select { padding: 0.5rem; border: 1px solid #ddd; border-radius: 8px; font-size: 0.9rem; outline: none; background: #fff; }
    .actions { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
    .btn { padding: 0.5rem 1.25rem; border: none; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer; }
    .btn-primary { background: #4361ee; color: #fff; }
    .btn-primary:hover { background: #3a56d4; }
    .btn-secondary { background: #e2e5ea; color: #333; }
    .btn-secondary:hover { background: #d1d5db; }
    .error { background: #fee2e2; color: #b91c1c; padding: 0.5rem 0.75rem; border-radius: 8px; font-size: 0.85rem; margin-bottom: 1rem; }
    .result-row { display: flex; justify-content: space-between; padding: 0.75rem; background: #f8f9ff; border-radius: 8px; margin-bottom: 0.5rem; }
    .result-label { font-weight: 500; color: #555; }
    .result-value { font-size: 1.25rem; font-weight: 700; color: #4361ee; }
    .history-row { display: flex; justify-content: space-between; padding: 0.5rem 0.75rem; font-size: 0.85rem; color: #888; }
  `],
})
export class AppComponent {
  // inject(): Obtiene el servicio CalculatorService
  // Es como pedirle a Angular "dame una calculadora"
  service = inject(CalculatorService);

  // Variables para los números de entrada
  a = 0;
  b = 0;

  // Tipo unión: Solo puede tener uno de estos valores
  // Es como un selector que solo permite ciertas opciones
  operation: 'add' | 'subtract' | 'multiply' | 'divide' = 'add';

  // Variable para almacenar mensajes de error
  error = '';

  // Método que se ejecuta al presionar "Calculate"
  calculate(): void {
    // Limpia el error anterior
    this.error = '';
    // try-catch: Maneja errores sin que la app se cierre
    // Es como un seguro: si algo falla, no pierdes todo
    try {
      // switch: Selección múltiple (como un menú de opciones)
      switch (this.operation) {
        case 'add':
          this.service.add(this.a, this.b);
          break;
        case 'subtract':
          this.service.subtract(this.a, this.b);
          break;
        case 'multiply':
          this.service.multiply(this.a, this.b);
          break;
        case 'divide':
          this.service.divide(this.a, this.b);
          break;
      }
    } catch (e) {
      // Si hay error (división por cero), lo captura y lo muestra
      // as Error: Type assertion - le dice a TypeScript que "e" es un Error
      this.error = (e as Error).message;
    }
  }

  // Método que se ejecuta al presionar "Clear"
  clear(): void {
    this.service.clear();
    this.a = 0;
    this.b = 0;
    this.error = '';
  }
}
