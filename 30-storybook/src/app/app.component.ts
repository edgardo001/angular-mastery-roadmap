import { Component } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  template: `
    <h1>Storybook — Button & Card</h1>
    <p class="subtitle">Componentes documentados con Storybook</p>
    <section>
      <h2>Botones</h2>
      <app-button label="Primary" variant="primary" (clicked)="log('Primary clicked')" />
      <app-button label="Secondary" variant="secondary" (clicked)="log('Secondary clicked')" />
    </section>
    <section>
      <h2>Tarjetas</h2>
      <app-card title="Angular 22" description="Última versión del framework" />
      <app-card title="Storybook" description="Herramienta de documentación" imageUrl="https://picsum.photos/seed/storybook/400/200" />
    </section>
    @if (lastAction) {
      <div class="log">{{ lastAction }}</div>
    }
  `,
  styles: [`
    h1 { text-align: center; margin-bottom: .25rem; }
    .subtitle { text-align: center; color: #666; margin-bottom: 2rem; }
    section { margin-bottom: 2rem; }
    section h2 { margin-bottom: 1rem; }
    app-button { margin-right: .5rem; }
    app-card { display: inline-block; width: 280px; margin-right: 1rem; vertical-align: top; }
    .log { margin-top: 1rem; padding: .75rem; background: #e3f2fd; border-radius: 6px; font-size: .875rem; }
  `]
})
export class AppComponent {
  lastAction = '';
  log(msg: string) { this.lastAction = msg; }
}
