import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="page">
      <h1>Bienvenido</h1>
      <p class="subtitle">Demostración de Routing y Navegación en Angular</p>
      @let today = todayDate;
      <p class="date"><strong>Hoy:</strong> {{ today | date:'fullDate' }}</p>
      <div class="features">
        <div class="feature-card">
          <h3>provideRouter</h3>
          <p>Configuración centralizada con <code>withComponentInputBinding</code> y <code>withViewTransitions</code></p>
        </div>
        <div class="feature-card">
          <h3>Lazy Loading</h3>
          <p>Cada página se carga bajo demanda con <code>loadComponent</code></p>
        </div>
        <div class="feature-card">
          <h3>Guards Funcionales</h3>
          <p><code>canActivateFn</code> y <code>canMatchFn</code> protegen las rutas</p>
        </div>
        <div class="feature-card">
          <h3>View Transitions</h3>
          <p>Navegación con transiciones suaves entre páginas</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page { padding: 2rem; max-width: 900px; margin: 0 auto; }
    h1 { font-size: 2rem; color: #1a1a2e; }
    .subtitle { color: #555; margin: 0.5rem 0 0.25rem; font-size: 1.1rem; }
    .date { color: #777; margin-bottom: 2rem; font-size: 0.95rem; }
    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
    .feature-card { background: #fff; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 6px rgba(0,0,0,0.07); }
    .feature-card h3 { margin-bottom: 0.5rem; color: #0f3460; }
    .feature-card p { color: #444; font-size: 0.9rem; }
    .feature-card code { background: #eef; padding: 0.1rem 0.3rem; border-radius: 4px; font-size: 0.85rem; }
  `],
})
export class HomeComponent {
  todayDate = new Date();
}
