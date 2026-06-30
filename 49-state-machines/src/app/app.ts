// Componente principal que muestra ejemplos de máquinas de estados
// Las máquinas de estados ayudan a manejar flujos de UI complejos
// Evitan bugs como "el botón está habilitado cuando no debería"
import { Component } from '@angular/core';
import { TrafficLightComponent } from './traffic-light';
import { CheckoutComponent } from './checkout';

@Component({
  selector: 'app-root',
  standalone: true,
  // Importamos los componentes que usan máquinas de estados
  imports: [TrafficLightComponent, CheckoutComponent],
  template: `
    <div class="container">
      <h1>State Machines</h1>
      <p class="subtitle">XState-powered state machines in Angular</p>
      <!-- Grid responsivo: 2 columnas en desktop, 1 en móvil -->
      <div class="grid">
        <app-traffic-light />
        <app-checkout />
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
    h1 { margin-bottom: 0.5rem; }
    .subtitle { color: #64748b; margin-bottom: 2rem; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
  `]
})
export class AppComponent {} // Componente sin lógica, solo muestra los ejemplos
