import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="auth-layout">
      <div class="auth-container">
        <router-outlet />
      </div>
    </div>
  `,
  styles: [`
    .auth-layout {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100dvh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .auth-container { width: 100%; max-width: 480px; padding: 1rem; }
  `]
})
export class AuthLayoutComponent {}
