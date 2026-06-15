import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/ui';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <form>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <app-button variant="primary" (onClick)="onLogin()">Iniciar Sesión</app-button>
    </form>
  `,
  styles: [`
    form { display: flex; flex-direction: column; gap: 0.75rem; }
    input { padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px; }
  `]
})
export class LoginFormComponent {
  onLogin(): void {
    console.log('Login submitted');
  }
}
