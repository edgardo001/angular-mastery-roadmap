import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page">
      <h1>Login Básico con Servicios + localStorage</h1>
      <p class="subtitle">Demostración de autenticación con señales, guards y persistencia local</p>
      <div class="features">
        <div class="feature-card">
          <h3>Auth Service</h3>
          <p>Estado de sesión con <code>signal&lt;AuthState&gt;</code> y <code>computed</code></p>
        </div>
        <div class="feature-card">
          <h3>localStorage</h3>
          <p>Persistencia automática mediante <code>effect()</code></p>
        </div>
        <div class="feature-card">
          <h3>Auth Guard</h3>
          <p>Protección de rutas con <code>canActivateFn</code></p>
        </div>
        <div class="feature-card">
          <h3>Login / Logout</h3>
          <p>Formulario con email/contraseña y señal de sesión</p>
        </div>
      </div>
      <div class="cta">
        <a routerLink="/login" class="btn-primary">Ir al Login</a>
      </div>
    </div>
  `,
  styles: [`
    .page { padding: 2rem; max-width: 900px; margin: 0 auto; }
    h1 { font-size: 2rem; color: #1a1a2e; }
    .subtitle { color: #555; margin: 0.5rem 0 2rem; font-size: 1.1rem; }
    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .feature-card { background: #fff; border-radius: 10px; padding: 1.25rem; box-shadow: 0 2px 6px rgba(0,0,0,0.07); }
    .feature-card h3 { margin-bottom: 0.5rem; color: #0f3460; }
    .feature-card p { color: #444; font-size: 0.9rem; }
    .feature-card code { background: #eef; padding: 0.1rem 0.3rem; border-radius: 4px; font-size: 0.85rem; }
    .cta { text-align: center; }
    .btn-primary { display: inline-block; padding: 0.7rem 2rem; background: #0f3460; color: #fff; border-radius: 8px; font-weight: 600; font-size: 1rem; transition: background 0.15s; }
    .btn-primary:hover { background: #1a5276; text-decoration: none; }
  `],
})
export class HomeComponent {}
