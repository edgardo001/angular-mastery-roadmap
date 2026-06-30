/**
 * Guard funcional que protege rutas de administrador.
 *
 * ANLOGÍA: Es como una puerta con candado que solo se abre
 * con la llave "admin". Si no la tienes, no pasas.
 */

import { inject } from '@angular/core';
import { AuthService } from '../auth.service';

/**
 * adminGuardFn: verifica que el rol del usuario sea 'admin'.
 * Se usa con canMatch en la configuración de rutas.
 */
export const adminGuardFn = () => {
  const auth = inject(AuthService);
  return auth.role() === 'admin';
};
