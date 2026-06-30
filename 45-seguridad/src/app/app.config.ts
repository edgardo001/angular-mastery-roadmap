// ApplicationConfig define la configuración de la aplicación Angular
import { ApplicationConfig } from '@angular/core';
// provideHttpClient: habilita el cliente HTTP para hacer peticiones a APIs
// withInterceptors: permite agregar interceptores que modifican cada petición
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// Nuestro interceptor personalizado que protege contra XSS
import { xssProtectionInterceptor } from './xss-protection.interceptor';

// appConfig contiene todos los providers (servicios) que la aplicación necesita
// Los providers son como "empleados" que Angular crea y gestiona
export const appConfig: ApplicationConfig = {
  providers: [
    // Configuramos HttpClient con nuestro interceptor de seguridad
    // Esto significa que CADA petición HTTP pasará por xssProtectionInterceptor
    provideHttpClient(withInterceptors([xssProtectionInterceptor])),
  ],
};
