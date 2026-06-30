import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ButtonComponent } from '@monorepo/ui-kit';
// import { formatCurrency } from '@monorepo/utils';
// import { User } from '@monorepo/shared-types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h1>📊 Admin Dashboard</h1>
      <p>Esta app usa librerías compartidas del monorepo:</p>

      <div class="cards">
        <div class="card">
          <h3>@monorepo/ui-kit</h3>
          <p>Componentes reutilizables (Button, Card, Input)</p>
          <p class="status">✅ Importado en angular.json paths</p>
        </div>
        <div class="card">
          <h3>@monorepo/utils</h3>
          <p>Funciones utilitarias (formatCurrency, formatDate)</p>
          <p class="status">✅ Importado en angular.json paths</p>
        </div>
        <div class="card">
          <h3>@monorepo/shared-types</h3>
          <p>Interfaces y tipos compartidos (User, Product)</p>
          <p class="status">✅ Importado en angular.json paths</p>
        </div>
      </div>

      <div class="example">
        <h3>Ejemplo de uso:</h3>
        <pre><code>// En cualquier app del monorepo:
import '@monorepo/ui-kit';
import '@monorepo/utils';
import '@monorepo/shared-types';

// Todos los proyectos comparten el mismo código
// Nx gestiona el build, cache y dependencias</code></pre>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { padding: 20px; }
    h1 { margin: 0 0 10px 0; }
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0; }
    .card { background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #1a73e8; }
    .card h3 { margin: 0 0 10px 0; color: #1a73e8; }
    .status { color: #2e7d32; font-weight: bold; }
    .example { background: #1a1a2e; color: #00ff88; padding: 20px; border-radius: 8px; margin-top: 20px; }
    pre { margin: 0; }
    code { font-family: 'Fira Code', monospace; }
  `],
})
export class DashboardComponent {}
