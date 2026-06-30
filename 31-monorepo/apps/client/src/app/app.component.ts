import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CardComponent } from '@monorepo/ui-kit';
// import { User } from '@monorepo/shared-types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px;">
      <h1>🛒 Client App</h1>
      <p>Esta es la app de cliente del monorepo.</p>
      <p>Usa las mismas libs que Admin: <code>@monorepo/ui-kit</code>, <code>@monorepo/utils</code>, <code>@monorepo/shared-types</code></p>
      <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 20px;">
        <h4>✅ Build Independiente</h4>
        <p>Esta app se puede construir y desplegar por separado:</p>
        <code>nx build client</code>
      </div>
    </div>
  `,
  styles: [`
    code { background: #e0e0e0; padding: 2px 6px; border-radius: 3px; font-family: 'Fira Code', monospace; }
  `],
})
export class AppComponent {}
