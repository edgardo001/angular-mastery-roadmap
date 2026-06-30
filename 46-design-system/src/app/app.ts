// Componente raíz que muestra todos los componentes del Design System
// Un Design System es una colección de componentes reutilizables con estilos consistentes
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button';
import { CardComponent } from './card/card';
import { InputComponent } from './input/input';
import { BadgeComponent } from './badge/badge';
import { ThemeComponent } from './theme/theme.component';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: lista de componentes que este componente puede usar en su template
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent,
    InputComponent,
    BadgeComponent,
    ThemeComponent,
    ModalComponent,
  ],
  template: `
    <div class="design-system">
      <header>
        <h1>Design System</h1>
        <p>Componentes reutilizables con Angular CDK/Material</p>
      </header>

      <!-- Theme Switcher: permite cambiar entre temas claro/oscuro/azul -->
      <app-theme />

      <!-- Sección de Botones: demuestra variantes y tamaños -->
      <section>
        <h2>Buttons</h2>
        <div class="component-grid">
          <!-- variant: tipo visual del botón (primary, secondary, outline, ghost) -->
          <!-- size: tamaño del botón (sm, md, lg) -->
          <app-button variant="primary" size="sm">Small</app-button>
          <app-button variant="primary" size="md">Medium</app-button>
          <app-button variant="primary" size="lg">Large</app-button>
          <app-button variant="secondary">Secondary</app-button>
          <app-button variant="outline">Outline</app-button>
          <app-button variant="ghost">Ghost</app-button>
          <!-- [disabled]: binding que deshabilita el botón cuando es true -->
          <app-button [disabled]="true">Disabled</app-button>
        </div>
      </section>

      <!-- Sección de Cards: contenedores con sombra y bordes redondeados -->
      <section>
        <h2>Cards</h2>
        <div class="component-grid">
          <app-card>
            <!-- card-header: directiva de proyección de contenido para el header -->
            <div card-header>Título</div>
            <p>Contenido de la tarjeta con header y footer.</p>
            <div card-footer>
              <app-button variant="primary" size="sm">Acción</app-button>
            </div>
          </app-card>

          <app-card>
            <p>Tarjeta simple sin header ni footer.</p>
          </app-card>
        </div>
      </section>

      <!-- Sección de Inputs: campos de formulario con validación -->
      <section>
        <h2>Inputs</h2>
        <div class="component-grid">
          <app-input label="Nombre" placeholder="Tu nombre" />
          <app-input label="Email" placeholder="correo@ejemplo.com" error="Email inválido" />
          <app-input label="Password" placeholder="••••••" helperText="Mínimo 8 caracteres" />
        </div>
      </section>

      <!-- Sección de Badges: etiquetas de estado o categoría -->
      <section>
        <h2>Badges</h2>
        <div class="component-grid">
          <app-badge color="primary">Primary</app-badge>
          <app-badge color="secondary">Secondary</app-badge>
          <app-badge color="success">Success</app-badge>
          <app-badge color="warning">Warning</app-badge>
          <app-badge color="error">Error</app-badge>
        </div>
      </section>

      <!-- Sección de Modal: ventana superpuesta -->
      <section>
        <h2>Modal</h2>
        <app-button (onClick)="showModal.set(true)">Abrir Modal</app-button>
        <!-- isOpen: controla visibilidad, close/confirm: eventos de cierre -->
        <app-modal
          [isOpen]="showModal()"
          title="Ejemplo de Modal"
          (close)="showModal.set(false)"
          (confirm)="showModal.set(false)">
          <p>Este es un modal usando Angular CDK.</p>
          <p>Haz clic fuera o en Cancelar para cerrar.</p>
        </app-modal>
      </section>
    </div>
  `,
  styles: [`
    .design-system { max-width: 1200px; margin: 0 auto; padding: 20px; }
    header { text-align: center; margin-bottom: 40px; }
    header h1 { font-size: 32px; color: #1a1a2e; }
    section { margin-bottom: 40px; }
    section h2 { color: #1a1a2e; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px; }
    .component-grid { display: flex; flex-wrap: wrap; gap: 15px; align-items: flex-start; margin-top: 15px; }
  `],
})
export class AppComponent {
  // signal: valor reactivo que controla la visibilidad del modal
  // showModal() lee el valor, showModal.set(true/false) lo cambia
  showModal = signal(false);
}
