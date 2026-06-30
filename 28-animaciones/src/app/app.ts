// =============================================================================
// ARCHIVO: app.ts
// PROPÓSITO: Componente raíz con navegación y animación de transición de rutas
// =============================================================================
//
// Este componente demuestra las animaciones de transición de ruta.
// Cuando el usuario cambia de página (Home ↔ About), el contenido
// actual se desliza hacia afuera y el nuevo se desliza hacia adentro.
//
// ¿Por qué importan las animaciones de ruta?
// Sin animaciones, cambiar de página es como saltar de una habitación a otra.
// Con animaciones, es como caminar por un pasillo: el cambio es gradual
// y tu cerebro puede seguir el hilo de la navegación.
// =============================================================================

// Component: Decorador de Angular
import { Component } from '@angular/core';

// RouterOutlet: El "hueco" donde se inserta el componente de la ruta actual
import { RouterOutlet } from '@angular/router';

// Importa la animación de transición de rutas
import { routeSlide } from './animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],

  // Registra la animación routeSlide para usarla en el template
  animations: [routeSlide],

  template: `
    <!-- BARRA DE NAVEGACIÓN -->
    <nav style="display:flex;gap:1rem;padding:1rem 2rem;background:#1e40af;">
      <!-- routerLink: Navega SPA sin recargar la página -->
      <a routerLink="/home" style="color:white;text-decoration:none;font-weight:500;">Home</a>
      <a routerLink="/about" style="color:white;text-decoration:none;font-weight:500;">About</a>
    </nav>

    <!--
      ÁREA DE CONTENIDO CON ANIMACIÓN DE RUTA:
      [@routeSlide]="getRouteAnimation()": Vincula la animación a un valor.
      
      Cada vez que la ruta cambia, getRouteAnimation() retorna un número
      diferente (1 para home, 2 para about). Angular detecta el cambio
      de valor y ejecuta la animación de transición automáticamente.
      
      overflow:hidden: Oculta el contenido que se desliza fuera del área visible.
      position:relative: Permite que los elementos hijos se posicionen correctamente.
    -->
    <main [@routeSlide]="getRouteAnimation()" style="position:relative;overflow:hidden;">
      <router-outlet />
    </main>
  `
})
export class App {
  // Retorna un valor numérico basado en la ruta actual.
  // Angular compara el valor anterior con el nuevo para saber si
  // debe ejecutar la animación de transición.
  //
  // ¿Por qué no usar el Router directamente?
  // Porque la animación necesita un valor que CAMBIE para detectar
  // la transición. Un número simple es más confiable que leer
  // la URL cada vez (que puede tener timing issues).
  getRouteAnimation() {
    const path = window.location.pathname;
    return path === '/home' ? 1 : path === '/about' ? 2 : 0;
  }
}
