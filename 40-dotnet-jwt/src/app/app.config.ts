/**
 * ARCHIVO: app.config.ts - Configuración de la aplicación Angular
 *
 * Este archivo define TODOS los "providers" (proveedores) que la aplicación necesita.
 * Un provider es como un servicio o herramienta que Angular puede entregar
 * a cualquier componente que lo pida.
 *
 * Analogía: Es como la lista de suministros de una fábrica. Antes de que
 * la fábrica pueda producir, necesita tener todas las herramientas y
 * materiales listos.
 */

// ApplicationConfig: Tipo que define la estructura de la configuración.
import { ApplicationConfig } from '@angular/core';

// provideRouter: Función que configura el sistema de enrutamiento (navegación).
import { provideRouter } from '@angular/router';

// provideHttpClient: Función que configura el cliente HTTP para hacer peticiones al servidor.
// withInterceptors: Permite agregar interceptores que modifican cada petición HTTP.
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// Importamos el interceptor JWT que agrega el token de autenticación a las peticiones.
import { jwtInterceptor } from './jwt.interceptor';

// Importamos las rutas de la aplicación.
import { routes } from './app.routes';

/**
 * appConfig: Objeto de configuración que se pasa a bootstrapApplication.
 *
 * providers: Lista de servicios y configuraciones que Angular debe conocer
 * antes de arrancar la aplicación. Es como "registrar" cada herramienta
 * para que esté disponible cuando alguien la necesite.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Registramos el sistema de rutas con las rutas definidas en app.routes.ts
    provideRouter(routes),
    // Registramos el cliente HTTP y le decimos que use nuestro interceptor JWT.
    // Esto significa que CADA petición HTTP pasará por jwtInterceptor automáticamente.
    provideHttpClient(withInterceptors([jwtInterceptor])),
  ],
};
