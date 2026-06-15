import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <p>&copy; {{ year }} {{ company }}. Todos los derechos reservados.</p>
    </footer>
  `,
  styles: [`
    footer { text-align: center; padding: 1.5rem; background: #1a1a2e; color: #999; font-size: 0.875rem; }
  `]
})
export class FooterComponent {
  @Input({ required: true }) year!: number;
  @Input({ required: true }) company!: string;
}
