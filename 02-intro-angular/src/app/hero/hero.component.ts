import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section>
      <h2>Hola, soy <span>{{ name }}</span></h2>
      <p class="role">{{ role }}</p>
      <p class="tagline">{{ tagline }}</p>
      <button (click)="notify.emit('¡Gracias por visitar mi portfolio!')">
        Contáctame
      </button>
    </section>
  `,
  styles: [`
    section { text-align: center; padding: 4rem 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
    h2 { font-size: 2.5rem; margin-bottom: 0.5rem; }
    span { color: #fdd835; }
    .role { font-size: 1.25rem; opacity: 0.9; margin-bottom: 0.5rem; }
    .tagline { font-size: 1rem; opacity: 0.8; margin-bottom: 2rem; }
    button { padding: 0.75rem 2rem; border: none; border-radius: 8px;
             background: white; color: #1a1a2e; font-size: 1rem;
             cursor: pointer; font-weight: 600; }
    button:hover { transform: scale(1.05); }
  `]
})
export class HeroComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) role!: string;
  @Input({ required: true }) tagline!: string;
  @Output() notify = new EventEmitter<string>();
}
