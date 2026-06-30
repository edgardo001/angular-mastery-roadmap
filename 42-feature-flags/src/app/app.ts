/**
 * ARCHIVO: app.ts - Componente raíz de la aplicación de Feature Flags
 *
 * Feature Flags (o Feature Toggles) son una técnica de desarrollo que permite
 * activar o desactivar funcionalidades de la aplicación en tiempo de ejecución.
 *
 * Ejemplo real: Una tienda online puede tener una nueva versión del checkout.
 * En lugar de lanzarla a todos los usuarios de golpe, puede activarla primero
 * para el 10% de los usuarios, y si funciona bien, gradualmente para todos.
 *
 * Analogía: Es como los interruptores de luz de una casa. Cada interruptor
 * controla una habitación (funcionalidad). Puedes encender o apagar cada
 * habitación independientemente de las demás.
 */

// Component: Decorador de Angular que define las propiedades de un componente.
// inject: Función para obtener servicios sin constructores.
import { Component, inject } from '@angular/core';

// Importamos el servicio de feature flags y el tipo de clave de feature flag.
import { FeatureFlagsService, FeatureFlagKey } from './feature-flags.service';

// Importamos las directivas para mostrar/ocultar elementos según feature flags.
import { FeatureFlagShowDirective, FeatureFlagHideDirective } from './feature-flag.directive';

@Component({
  selector: 'app-root',
  // imports: Lista de directivas que este componente usa en su template.
  // Las directivas modifican la apariencia o comportamiento del DOM.
  imports: [FeatureFlagShowDirective, FeatureFlagHideDirective],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  /**
   * flags: Referencia al servicio de feature flags.
   * Permite acceder y modificar el estado de las feature flags.
   */
  readonly flags = inject(FeatureFlagsService);

  /**
   * toggle: Cambia el estado de una feature flag específica.
   * Si está activada, la desactiva y viceversa.
   *
   * @param key - Clave de la feature flag a cambiar ('newCheckout', 'darkMode', 'betaSearch')
   */
  toggle(key: FeatureFlagKey): void {
    this.flags.toggle(key);
  }

  /**
   * flagList: Getter que devuelve la lista de todas las feature flags con sus valores.
   * Se usa en el template para mostrar el estado actual de cada flag.
   */
  get flagList() {
    return this.flags.allFlags();
  }
}
