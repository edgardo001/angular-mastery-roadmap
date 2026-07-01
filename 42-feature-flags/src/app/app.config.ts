/**
 * ARCHIVO: app.config.ts - Configuración de la aplicación Angular (Feature Flags)
 *
 * Este archivo define los providers que la aplicación necesita para funcionar.
 * Un provider es como un "proveedor de servicios": le dice a Angular dónde
 * encontrar las dependencias que los componentes necesitan.
 *
 * Analogía: Es como el directorio telefónico de una empresa. Cuando un
 * empleado (componente) necesita un servicio, consulta el directorio
 * (providers) para encontrar al proveedor correcto.
 */

// ApplicationConfig: Tipo que define la estructura de la configuración.
import { ApplicationConfig } from '@angular/core';

// provideHttpClient: Función que registra el servicio HttpClient como provider.
// HttpClient es la herramienta de Angular para hacer peticiones HTTP (GET, POST, etc.).
import { provideHttpClient } from '@angular/common/http';

// FeatureFlagsService: Servicio de feature flags que se registrará como provider.
import { FeatureFlagsService } from './feature-flags.service';

/**
 * appConfig: Configuración de la aplicación.
 *
 * Cada provider que registramos aquí hace que ese servicio esté disponible
 * en toda la aplicación mediante inyección de dependencias.
 *
 * providers: [
 *   FeatureFlagsService,  - Servicio de feature flags (estado local + remoto)
 *   provideHttpClient(),  - Habilita HttpClient para peticiones HTTP
 * ]
 *
 * ¿Por qué provideHttpClient()?
 * Porque FeatureFlagsApiService usa HttpClient internamente para
 * comunicarse con el API remoto. Sin este provider, Angular no sabría
 * cómo crear instancias de HttpClient y obtendríamos un error.
 *
 * En una app real, aquí también registrarías:
 * - provideRouter(routes) para la navegación
 * - provideAnimations() para animaciones
 * - Interceptors, pipes, etc.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    FeatureFlagsService,
    provideHttpClient(),
  ],
};
