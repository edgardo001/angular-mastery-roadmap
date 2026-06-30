/**
 * COMPONENTE PRINCIPAL DE DOCKER (App)
 * ======================================
 *
 * Componente simple que muestra información sobre la app dockerizada.
 * Demuestra una aplicación Angular ejecutándose en Docker.
 *
 * ANÁLOGÍA: Es como una "etiqueta" que muestra:
 * - Qué tecnología se usa (Angular 22)
 * - En qué entorno corre (Docker con Node/Alpine)
 * - Qué servidor sirve los archivos (Nginx)
 *
 * PALABRAS CLAVE:
 * - standalone: true: El componente es autocontenido (no necesita NgModule)
 * - template inline: El HTML está directamente en el archivo .ts
 * - styles inline: Los estilos CSS están directamente en el archivo .ts
 *
 * ¿POR QUÉ DOCKER?
 * - Consistencia: La app funciona igual en cualquier computadora
 * - Aislamiento: No depende de configuraciones del sistema
 * - Portabilidad: Se puede desplegar en cualquier servidor
 * - Escalabilidad: Fácil de replicar y escalar
 *
 * ARQUITECTURA DOCKER:
 * - Fase 1 (build): Node.js compila la app Angular
 * - Fase 2 (runtime): Nginx sirve los archivos estáticos
 * - Resultado: Imagen Docker pequeña y optimizada
 */

// Component: Decorador del componente
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // standalone: true: El componente es autocontenido
  standalone: true,
  // Template inline: El HTML está directamente en el archivo
  template: `
    <div class="container">
      <div class="card">
        <h1>🐳 Angular Dockerizado</h1>
        <p>Aplicación Angular ejecutándose dentro de un contenedor Docker</p>
        <div class="info">
          <!-- Muestra las tecnologías que usa la app -->
          <span>Angular 22</span>
          <span>Node 22 Alpine</span>
          <span>Nginx Alpine</span>
        </div>
      </div>
    </div>
  `,
  // Styles inline: Los estilos CSS están directamente en el archivo
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      /* 100dvh: 100% de la altura del viewport dinámico */
      height: 100dvh;
      /* Fondo degradado de azul a morado */
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
// App: Componente principal de la aplicación dockerizada
export class App {}
