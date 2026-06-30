/**
 * ARCHIVO: feature-flag.directive.ts - Directivas para Feature Flags
 *
 * Las directivas en Angular son clases que agregan comportamiento adicional
 * a elementos del DOM. En este caso, creamos dos directivas que muestran
 * u ocultan elementos HTML según el estado de una feature flag.
 *
 * Analogía: Es como un control remoto de TV. Las directivas son los botones
 * que encienden o apagan diferentes partes de la pantalla (elementos HTML).
 *
 * Directivas disponibles:
 * - [ffShow]: Muestra el elemento si la feature flag está ACTIVADA
 * - [ffHide]: Oculta el elemento si la feature flag está ACTIVADA
 *
 * Ejemplo de uso en HTML:
 * <div *ffShow="'newCheckout'">Nuevo checkout visible</div>
 * <div *ffHide="'darkMode'">Contenido visible cuando darkMode está desactivado</div>
 */

// Directive: Decorador de Angular que define una directiva.
// Input: Decorador que permite pasar valores desde el template al componente.
// TemplateRef: Referencia al template (HTML) que la directiva va a manipular.
// ViewContainerRef: Referencia al contenedor donde se insertará el template.
// inject: Función para obtener servicios sin constructores.
// effect: Función que ejecuta código reactivo cuando cambian signals.
import { Directive, Input, TemplateRef, ViewContainerRef, inject, effect } from '@angular/core';

// Importamos el servicio de feature flags y el tipo de clave de feature flag.
import { FeatureFlagsService, FeatureFlagKey } from './feature-flags.service';

/**
 * FeatureFlagShowDirective: Directiva que MUESTRA un elemento solo si
 * la feature flag está activada.
 *
 * [ffShow]: Selector de la directiva. Se usa en el template como:
 * <elemento *ffShow="'nombreFlag'">
 */
@Directive({ selector: '[ffShow]' })
export class FeatureFlagShowDirective {
  // Obtenemos el servicio de feature flags mediante inyección de dependencias.
  private readonly flags = inject(FeatureFlagsService);
  // TemplateRef: Representa el bloque HTML que esta directiva controla.
  private readonly template = inject(TemplateRef);
  // ViewContainerRef: El lugar donde se insertará o eliminará el template.
  private readonly container = inject(ViewContainerRef);

  // Clave de la feature flag que controla este elemento.
  private key: FeatureFlagKey = 'newCheckout';
  // Si negate es true, se invierte la lógica (mostrar si está DESACTIVADO).
  private negate = false;

  /**
   * @Input() set ffShow: Recibe el nombre de la feature flag desde el template.
   *
   * Ejemplo: <div *ffShow="'darkMode'">
   * El valor 'darkMode' se asigna a this.key.
   */
  @Input() set ffShow(val: FeatureFlagKey) {
    this.key = val;
    this.negate = false;
    this.update(); // Actualizamos la visibilidad del elemento.
  }

  /**
   * @Input() set ffShowNegate: Permite invertir la lógica de la directiva.
   *
   * Ejemplo: <div *ffShow="'darkMode'" [ffShowNegate]="true">
   * Esto mostraría el elemento cuando darkMode está DESACTIVADO.
   */
  @Input() set ffShowNegate(val: boolean) {
    this.negate = val;
    this.update();
  }

  /**
   * update: Crea un effect que reacciona a cambios en la feature flag.
   *
   * effect(): Función de Angular que ejecuta código cada vez que cambian
   * los signals que se leen dentro de ella. Es como un "observador automático".
   *
   * Flujo:
   * 1. Obtiene el signal de la feature flag
   * 2. Lee el valor actual (enabled)
   * 3. Si la flag está activada (o desactivada con negate), muestra el template
   * 4. Si no, elimina el template del DOM (oculta el elemento)
   */
  private update(): void {
    const sig = this.flags.getSignal(this.key);
    effect(() => {
      const enabled = sig(); // Lee el valor del signal (esto crea una "dependencia")
      if (this.negate ? !enabled : enabled) {
        // createEmbeddedView: Inserta el template en el DOM (muestra el elemento).
        this.container.createEmbeddedView(this.template);
      } else {
        // clear: Elimina todos los templates del contenedor (oculta el elemento).
        this.container.clear();
      }
    });
  }
}

/**
 * FeatureFlagHideDirective: Directiva que OCULTA un elemento si
 * la feature flag está activada.
 *
 * Es el opuesto de ffShow. Se usa cuando quieres ocultar algo
 * cuando una funcionalidad está habilitada.
 *
 * Ejemplo de uso:
 * <div *ffHide="'newCheckout'">Versión antigua del checkout</div>
 */
@Directive({ selector: '[ffHide]' })
export class FeatureFlagHideDirective {
  private readonly flags = inject(FeatureFlagsService);
  private readonly template = inject(TemplateRef);
  private readonly container = inject(ViewContainerRef);

  private key: FeatureFlagKey = 'newCheckout';

  /**
   * @Input() set ffHide: Recibe el nombre de la feature flag desde el template.
   *
   * Cuando cambia el valor, crea un nuevo effect que reacciona al cambio.
   */
  @Input() set ffHide(val: FeatureFlagKey) {
    this.key = val;
    const sig = this.flags.getSignal(this.key);
    effect(() => {
      // Si la flag está DESACTIVADA, mostramos el elemento.
      // Si está ACTIVADA, ocultamos el elemento.
      if (!sig()) {
        this.container.createEmbeddedView(this.template);
      } else {
        this.container.clear();
      }
    });
  }
}
