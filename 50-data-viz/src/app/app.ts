import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent],
  template: `
    <div class="container">
      <h1>Data Visualization</h1>
      <app-dashboard />
    </div>
  `,
  styles: [`
    .container { max-width: 1100px; margin: 0 auto; padding: 2rem; }
    h1 { margin-bottom: 2rem; }
  `]
})
export class AppComponent {}
