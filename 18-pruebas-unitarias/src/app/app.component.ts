import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="app">
      <header class="header">
        <h1>Calculadora</h1>
        <p class="subtitle">Pruebas Unitarias — Angular 22</p>
      </header>

      <main class="main">
        <section class="card">
          <div class="input-row">
            <input type="number" [(ngModel)]="a" class="input" placeholder="First number" />
            <select [(ngModel)]="operation" class="select">
              <option value="add">+</option>
              <option value="subtract">−</option>
              <option value="multiply">×</option>
              <option value="divide">÷</option>
            </select>
            <input type="number" [(ngModel)]="b" class="input" placeholder="Second number" />
          </div>

          <div class="actions">
            <button class="btn btn-primary" (click)="calculate()">Calculate</button>
            <button class="btn btn-secondary" (click)="clear()">Clear</button>
          </div>

          @if (error) {
            <div class="error">{{ error }}</div>
          }

          <div class="result-row">
            <span class="result-label">Result:</span>
            <span class="result-value">{{ service.result() }}</span>
          </div>

          <div class="history-row">
            <span class="result-label">Last op:</span>
            <span class="history-value">{{ service.lastOperation() || '—' }}</span>
          </div>
        </section>
      </main>
    </div>
  `,
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
  service = inject(CalculatorService);

  a = 0;
  b = 0;
  operation: 'add' | 'subtract' | 'multiply' | 'divide' = 'add';
  error = '';

  calculate(): void {
    this.error = '';
    try {
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
      this.error = (e as Error).message;
    }
  }

  clear(): void {
    this.service.clear();
    this.a = 0;
    this.b = 0;
    this.error = '';
  }
}
