import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="container">
      <div class="card">
        <h1>🐳 Angular Dockerizado</h1>
        <p>Aplicación Angular ejecutándose dentro de un contenedor Docker</p>
        <div class="info">
          <span>Angular 22</span>
          <span>Node 22 Alpine</span>
          <span>Nginx Alpine</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100dvh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: system-ui, -apple-system, sans-serif;
    }
    .card {
      background: white;
      border-radius: 16px;
      padding: 3rem;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      max-width: 500px;
    }
    h1 { font-size: 2rem; margin: 0 0 1rem; color: #c3002f; }
    p { color: #6b7280; margin: 0 0 2rem; font-size: 1.1rem; }
    .info { display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; }
    .info span {
      background: #f3f4f6;
      padding: 0.4rem 1rem;
      border-radius: 20px;
      font-size: 0.85rem;
      color: #374151;
      font-weight: 500;
    }
  `]
})
export class App {}
