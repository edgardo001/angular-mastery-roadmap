import { Component } from '@angular/core';
import { ButtonComponent } from './button/button';
import { CardComponent } from './card/card';
import { InputComponent } from './input/input';
import { BadgeComponent } from './badge/badge';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, CardComponent, InputComponent, BadgeComponent],
  template: `
    <div class="container">
      <h1>Design System</h1>

      <section>
        <h2>Buttons</h2>
        <div class="row">
          <app-button variant="primary">Primary</app-button>
          <app-button variant="secondary">Secondary</app-button>
          <app-button variant="outline">Outline</app-button>
          <app-button variant="ghost">Ghost</app-button>
        </div>
        <div class="row">
          <app-button size="sm">Small</app-button>
          <app-button size="md">Medium</app-button>
          <app-button size="lg">Large</app-button>
        </div>
        <div class="row">
          <app-button [disabled]="true">Disabled</app-button>
        </div>
      </section>

      <section>
        <h2>Cards</h2>
        <app-card>
          <div card-header>Card Title</div>
          <p>This is the card body content. It can contain any content.</p>
          <div card-footer>Card Footer</div>
        </app-card>
      </section>

      <section>
        <h2>Inputs</h2>
        <app-input id="name" label="Name" placeholder="Enter your name" helperText="Your full name" />
        <app-input id="email" label="Email" placeholder="Enter email" error="Invalid email address" />
      </section>

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
export class AppComponent {}
