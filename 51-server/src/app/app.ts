// Componente que muestra información de despliegue
// Útil para verificar en qué entorno está ejecutándose la aplicación
// En SSR, estas variables pueden venir del servidor o del cliente
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main>
      <h1>Deployment Info</h1>
      <!-- dl: lista de definiciones (HTML semántico) -->
      <dl>
        <!-- dt: término (etiqueta), dd: definición (valor) -->
        <dt>Environment</dt>
        <dd>{{ environment }}</dd> <!-- development, production, staging -->
        <dt>Build Time</dt>
        <dd>{{ buildTime }}</dd> <!-- Cuándo se compiló la app -->
        <dt>Node Version</dt>
        <dd>{{ nodeVersion }}</dd> <!-- Versión de Node.js usada -->
        <dt>Platform</dt>
        <dd>{{ platform }}</dd> <!-- Plataforma: Win32, MacIntel, etc. -->
      </dl>
    </main>
  `,
  styles: [`
    main { max-width: 600px; margin: 4rem auto; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    h1 { margin-bottom: 1.5rem; color: #1e40af; }
    dl { display: grid; grid-template-columns: auto 1fr; gap: 0.75rem 1rem; }
    dt { font-weight: 600; color: #4b5563; }
    dd { color: #111827; }
  `]
})
export class App {
  // (window as any).__env: objeto global inyectado por el servidor con variables de entorno
  // Si no existe (en desarrollo), usamos valores por defecto
  // Esto permite al frontend saber en qué entorno está ejecutándose
  environment = (window as any).__env?.ENVIRONMENT || 'development';
  buildTime = (window as any).__env?.BUILD_TIME || new Date().toISOString();
  nodeVersion = (window as any).__env?.NODE_VERSION || 'unknown';
  platform = (window as any).__env?.PLATFORM || navigator.platform;
}
