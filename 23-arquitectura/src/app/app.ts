/**
 * COMPONENTE RAÍZ DE LA APLICACIÓN (App)
 * ========================================
 *
 * Componente raíz que contiene el RouterOutlet.
 * RouterOutlet es un "placeholder" que muestra el componente de la ruta actual.
 *
 * ANÁLOGÍA: Es como una pantalla de TV:
 * - RouterOutlet es la pantalla
 * - Las rutas son los canales
 * - Cuando cambias de canal, cambia lo que se muestra en la pantalla
 *
 * PALABRAS CLAVE:
 * - RouterOutlet: Directiva que muestra el componente de la ruta actual
 * - standalone: true: El componente es autocontenido
 * - imports: RouterOutlet se importa directamente (forma moderna)
 *
 * FLUJO:
 * 1. El usuario navega a una URL (ej: /dashboard)
 * 2. Angular busca la ruta en app.routes.ts
 * 3. RouterOutlet renderiza el componente correspondiente
 */

// Component: Decorador del componente
import { Component } from '@angular/core';

// RouterOutlet: Directiva que muestra el componente de la ruta actual
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // RouterOutlet se importa directamente (forma moderna de Angular)
  imports: [RouterOutlet],
  // Template minimalista: solo RouterOutlet
  // El contenido cambia según la ruta que el usuario visite
  template: `<router-outlet />`,
})
// App: Componente raíz que solo contiene RouterOutlet
export class App {}
