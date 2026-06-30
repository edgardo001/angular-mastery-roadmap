// =============================================================================
// ARCHIVO: about.ts
// PROPÓSITO: Página "Acerca de" con animación fade-in simple
// =============================================================================
//
// Este componente es una página estática que demuestra la animación fade-in
// (aparición gradual). Cuando el usuario navega a esta página, el contenido
// aparece suavemente de invisible a visible, en lugar de aparecer de golpe.
//
// ¿Por qué importa?
// Las animaciones de entrada hacen que la app se sienta más pulida y
// profesional. Es como la diferencia entre abrir una puerta de golpe
// vs. empujarla suavemente.
// =============================================================================

// Component: Decorador que define un componente Angular
import { Component } from '@angular/core';

// Importa la animación fade-in desde el archivo de animaciones compartidas
import { fadeIn } from '../../animations';

@Component({
  selector: 'app-about',
  standalone: true,

  // Registra la animación fadeIn para poder usarla en el template
  animations: [fadeIn],

  template: `
    <!--
      [@fadeIn]: Aplica la animación de aparición gradual.
      Cuando este <div> entra al DOM (el usuario navega a /about),
      el contenido aparece progresivamente durante 600ms.
    -->
    <div [@fadeIn] style="max-width:700px;margin:2rem auto;padding:0 1rem;">
      <h1 style="color:#1e40af;font-size:2rem;">About Animations</h1>
      <p style="margin-top:1rem;line-height:1.7;">
        This project demonstrates Angular's animation capabilities including:
      </p>
      <ul style="margin-top:1rem;padding-left:1.5rem;line-height:2;">
        <li>Fade-in transitions (aparición gradual)</li>
        <li>Slide enter/leave animations (deslizamiento)</li>
        <li>List stagger animations (aparición escalonada)</li>
        <li>Animated route transitions (transiciones entre páginas)</li>
        <li>Expand/collapse states (expandir/colapsar)</li>
      </ul>
    </div>
  `
})
// Componente "tonto" (sin lógica): solo presenta HTML con una animación.
// Es como un cartel estático con un efecto de iluminación suave.
export class AboutPage {}
