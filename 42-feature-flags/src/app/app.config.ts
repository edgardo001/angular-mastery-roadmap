/**
 * ARCHIVO: app.config.ts - Configuración de la aplicación Angular (Feature Flags)
 *
 * Este archivo define los providers que la aplicación necesita para funcionar.
 * En este ejemplo, solo registramos el servicio de feature flags.
 *
 * Analogía: Es como registrar un nuevo servicio en el directorio telefónico
 * de una empresa. Una vez registrado, cualquier empleado (componente) puede
 * encontrarlo y usarlo.
 */

// ApplicationConfig: Tipo que define la estructura de la configuración.
import { ApplicationConfig } from '@angular/core';

// Importamos el servicio de feature flags que se registrará como provider.
import { FeatureFlagsService } from './feature-flags.service';

/**
 * appConfig: Configuración de la aplicación.
 *
 * Solo necesitamos registrar FeatureFlagsService como provider.
 * Esto hace que esté disponible en toda la aplicación mediante
 * la inyección de dependencias de Angular.
 *
 * En una app real, aquí también registrarías:
 * - provideRouter(routes) para la navegación
 * - provideHttpClient() para peticiones HTTP
 * - Interceptors, pipes, etc.
 */
export const appConfig: ApplicationConfig = {
  providers: [FeatureFlagsService],
};
