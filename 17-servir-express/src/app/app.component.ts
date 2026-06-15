import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="container">
      <h1>Módulo 17: Servir Angular con Express</h1>
      <p>Esta aplicación Angular es servida mediante un servidor Express.js.</p>
      <div class="card">
        <h2>¿Cómo funciona?</h2>
        <ol>
          <li>Ejecuta <code>ng build</code> para compilar la aplicación Angular</li>
          <li>El servidor en <code>server.js</code> sirve los archivos estáticos desde <code>dist/app/browser</code></li>
          <li>Express captura todas las rutas y devuelve <code>index.html</code> (SPA routing)</li>
        </ol>
        <p class="note">
          Para iniciar: <code>node server.js</code> y abre <a href="http://localhost:3000">http://localhost:3000</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 640px; margin: 40px auto; font-family: system-ui, sans-serif; padding: 0 16px; }
    h1 { font-size: 1.5rem; margin-bottom: 8px; }
    p { color: #555; }
    .card { background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 20px 24px; margin-top: 20px; }
    h2 { font-size: 1.1rem; margin: 0 0 12px; }
    ol { margin: 0; padding-left: 20px; }
    li { margin-bottom: 6px; line-height: 1.5; }
    code { background: #e8e8e8; padding: 2px 6px; border-radius: 4px; font-size: 0.85rem; }
    .note { margin-top: 16px; font-size: 0.9rem; color: #666; }
  `]
})
export class AppComponent {}
