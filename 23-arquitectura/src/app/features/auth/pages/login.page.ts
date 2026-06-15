import { Component } from '@angular/core';
import { LoginFormComponent } from '../components/login-form.component';
import { CardComponent } from '../../../shared/ui';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent, CardComponent],
  template: `
    <div class="login-page">
      <app-card>
        <h2>Iniciar Sesión</h2>
        <app-login-form />
      </app-card>
    </div>
  `,
  styles: [`
    .login-page {
      max-width: 400px;
      margin: 4rem auto;
    }
    h2 { margin: 0 0 1rem; }
  `]
})
export class LoginPage {}
