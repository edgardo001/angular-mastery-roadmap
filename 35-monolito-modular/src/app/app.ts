/**
 * Componente raíz del Monolito Modular.
 *
 * Este componente solo contiene la navegación y el RouterOutlet.
 * RouterOutlet es un placeholder donde Angular muestra el componente
 * según la ruta actual. Es como un marco que cambia la pintura.
 *
 * Imports:
 * - RouterOutlet: Placeholder para contenido dinámico según la ruta
 * - RouterLink: Directiva para crear enlaces de navegación
 * - RouterLinkActive: Agrega una clase CSS cuando la ruta está activa
 */
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
