import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header>
      <h1>{{ title }}</h1>
      <nav>
        @for (link of navLinks; track link) {
          <a href="#">{{ link }}</a>
        }
      </nav>
    </header>
  `,
  styles: [`
    header { display: flex; justify-content: space-between; align-items: center;
             padding: 1rem 2rem; background: #1a1a2e; color: white; }
    h1 { font-size: 1.25rem; }
    nav { display: flex; gap: 1rem; }
    a { color: #e0e0e0; text-decoration: none; }
    a:hover { color: #4fc3f7; }
  `]
})
export class HeaderComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) navLinks!: string[];
}
