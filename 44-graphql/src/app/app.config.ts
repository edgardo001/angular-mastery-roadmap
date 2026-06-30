/**
 * ARCHIVO: app.config.ts - Configuración de la aplicación Angular (GraphQL)
 *
 * Este archivo configura los providers necesarios para la aplicación GraphQL:
 * - Cliente HTTP para las peticiones al servidor GraphQL
 * - Apollo Angular para ejecutar consultas y mutaciones
 *
 * Analogía: Es como configurar una estación de trabajo con todas las
 * herramientas necesarias: el navegador web (HTTP), el cliente GraphQL (Apollo),
 * y la conexión al servidor (graphql.config).
 */

// ApplicationConfig: Tipo que define la estructura de la configuración.
import { ApplicationConfig } from '@angular/core';

// provideHttpClient: Configura el cliente HTTP para hacer peticiones al servidor.
import { provideHttpClient } from '@angular/common/http';

// Importamos la configuración de Apollo GraphQL.
import { appApolloOptions } from './graphql.config';

/**
 * appConfig: Configuración de la aplicación.
 *
 * providers:
 * 1. Cliente HTTP: Necesario para que Apollo pueda hacer peticiones al servidor GraphQL.
 * 2. Apollo GraphQL: Configura el cliente Apollo con la caché, URL del servidor,
 *    y opciones por defecto.
 *
 * El spread operator (...) expande el array appApolloOptions para agregar
 * cada elemento como provider individual.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Cliente HTTP base para peticiones al servidor
    provideHttpClient(),
    // Apollo GraphQL: Apollo + configuración del cliente
    // appApolloOptions es un array [Apollo, { provide, useFactory, deps }]
    ...appApolloOptions,
  ],
};
