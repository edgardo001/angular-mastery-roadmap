// ============================================================================
// CONTEXTO PARA OMITIR AUTENTICACIÓN (skip-auth.context.ts)
// ============================================================================
// HttpContextToken: Permite crear tokens de contexto para pasar información
// a los interceptores SIN modificar la petición HTTP.
//
// ANÁLOGÍA: Es como un "vale" o "pase especial" que puedes agregar a una petición
// para que el interceptor sepa que debe saltarse un paso (como la autenticación).

import { HttpContextToken } from '@angular/common/http';

// HttpContextToken<boolean>: Crea un token con valor por defecto false.
// Cuando una petición tiene SKIP_AUTH = true, el interceptor de auth no agrega el token.
// El parámetro () => false es una "factory function" que genera el valor por defecto.
export const SKIP_AUTH = new HttpContextToken<boolean>(() => false);
