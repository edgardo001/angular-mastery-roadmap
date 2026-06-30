/**
 * ARCHIVO: app.config.ts - Configuración de la aplicación Angular (GraphQL)
 *
 * Este archivo configura los providers necesarios para la aplicación GraphQL:
 * - Cliente HTTP para las peticiones al servidor GraphQL
 * - Apollo Angular para ejecutar consultas y mutaciones
 * - Router para la navegación entre componentes
 *
 * Analogía: Es como configurar una estación de trabajo con todas las
 * herramientas necesarias: el navegador web (HTTP), el cliente GraphQL (Apollo),
 * y la conexión al servidor (graphql.config).
 */

// ApplicationConfig: Tipo que define la estructura de la configuración.
import { ApplicationConfig } from '@angular/core';

// provideRouter: Configura el enrutador para la navegación entre vistas.
import { provideRouter } from '@angular/router';

// provideHttpClient: Configura el cliente HTTP para hacer peticiones al servidor.
import { provideHttpClient } from '@angular/common/http';

// Importamos la configuración de Apollo GraphQL.
import { appApolloOptions } from './graphql.config';

// Importamos las rutas de la aplicación.
import { routes } from './app.routes';

/**
 * appConfig: Configuración de la aplicación.
 *
 * providers:
 * 1. provideRouter(routes): Configura el enrutador con las rutas definidas.
 *    Esto permite navegar entre componentes como /countries.
 * 2. provideHttpClient(): Cliente HTTP base para peticiones al servidor GraphQL.
 * 3. Apollo GraphQL: Configura el cliente Apollo con la caché, URL del servidor,
 *    y opciones por defecto.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Enrutador: Permite navegar entre vistas (/countries, etc.)
    provideRouter(routes),
    // Cliente HTTP base para peticiones al servidor GraphQL
    provideHttpClient(),
    // Apollo GraphQL: configuración del cliente
    ...appApolloOptions,
  ],
};
