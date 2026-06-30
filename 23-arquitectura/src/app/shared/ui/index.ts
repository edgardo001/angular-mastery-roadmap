/**
 * ARCHIVO DE ÍNDICE PARA COMPONENTES UI COMPARTIDOS
 * ===================================================
 *
 * Re-exporta todos los componentes UI para facilitar importaciones.
 * Permite importar múltiples componentes desde UN solo archivo.
 *
 * ANÁLOGÍA: Es como un "índice" de un libro. En lugar de buscar
 * cada capítulo por separado, miras el índice y encuentras todo.
 *
 * EJEMPLO DE USO:
 * import { ButtonComponent, CardComponent } from './shared/ui';
 * En lugar de:
 * import { ButtonComponent } from './shared/ui/button.component';
 * import { CardComponent } from './shared/ui/card.component';
 */

// Re-exporta el componente ButtonComponent desde su archivo
export { ButtonComponent } from './button.component';
// Re-exporta el componente CardComponent desde su archivo
export { CardComponent } from './card.component';
