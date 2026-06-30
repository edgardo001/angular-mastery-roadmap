// Componente raíz que muestra todos los componentes del Design System
// Un Design System es una colección de componentes reutilizables con estilos consistentes
// Ejemplo: botones, cards, inputs, badges que se usan en toda la aplicación
import { Component } from '@angular/core';
// Importamos todos los componentes del design system
import { ButtonComponent } from './button/button';
import { CardComponent } from './card/card';
import { InputComponent } from './input/input';
import { BadgeComponent } from './badge/badge';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: lista de componentes que este componente puede usar en su template
  imports: [ButtonComponent, CardComponent, InputComponent, BadgeComponent],
  template: `
    <div class="container">
      <h1>Design System</h1>

      <!-- Sección de Botones: demuestra variantes y tamaños -->
      <section>
        <h2>Buttons</h2>
        <!-- variant: tipo visual del botón (primary, secondary, outline, ghost) -->
        <div class="row">
          <app-button variant="primary">Primary</app-button>
          <app-button variant="secondary">Secondary</app-button>
          <app-button variant="outline">Outline</app-button>
          <app-button variant="ghost">Ghost</app-button>
        </div>
        <!-- size: tamaño del botón (sm, md, lg) -->
        <div class="row">
          <app-button size="sm">Small</app-button>
          <app-button size="md">Medium</app-button>
          <app-button size="lg">Large</app-button>
        </div>
        <!-- [disabled]: binding que deshabilita el botón cuando es true -->
        <div class="row">
          <app-button [disabled]="true">Disabled</app-button>
        </div>
      </section>

      <!-- Sección de Cards: contenedores con sombra y bordes redondeados -->
      <section>
        <h2>Cards</h2>
        <app-card>
          <!-- card-header: directiva de proyección de contenido para el header -->
          <div card-header>Card Title</div>
          <!-- Contenido principal de la card -->
          <p>This is the card body content. It can contain any content.</p>
          <!-- card-footer: directiva de proyección de contenido para el footer -->
          <div card-footer>Card Footer</div>
        </app-card>
      </section>

      <!-- Sección de Inputs: campos de formulario con validación -->
      <section>
        <h2>Inputs</h2>
        <!-- helperText: texto de ayuda que se muestra debajo del campo -->
        <app-input id="name" label="Name" placeholder="Enter your name" helperText="Your full name" />
        <!-- error: mensaje de error que se muestra en rojo -->
        <app-input id="email" label="Email" placeholder="Enter email" error="Invalid email address" />
      </section>

      <!-- Sección de Badges: etiquetas de estado o categoría -->
      <section>
        <h2>Badges</h2>
        <div class="row">
          <app-badge color="primary">Primary</app-badge>
          <app-badge color="secondary">Secondary</app-badge>
          <app-badge color="success">Success</app-badge>
          <app-badge color="warning">Warning</app-badge>
          <app-badge color="error">Error</app-badge>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 0 auto; padding: var(--spacing-xl); }
    h1 { font-size: var(--font-size-xl); margin-bottom: var(--spacing-lg); }
    h2 { font-size: var(--font-size-lg); margin: var(--spacing-lg) 0 var(--spacing-md); color: var(--color-text-secondary); }
    .row { display: flex; gap: var(--spacing-sm); flex-wrap: wrap; margin-bottom: var(--spacing-md); }
    section { margin-bottom: var(--spacing-xl); }
  `]
})
export class AppComponent {} // Componente sin lógica, solo muestra los componentes del design system
