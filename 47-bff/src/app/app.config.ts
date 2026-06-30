// ApplicationConfig: tipo que define la configuración de la aplicación Angular
import { ApplicationConfig } from '@angular/core';
// provideHttpClient: habilita el cliente HTTP para hacer peticiones a APIs
// withFetch: usa la API fetch nativa del navegador en lugar de XMLHttpRequest
// Más moderno y mejor rendimiento, especialmente en SSR (Server-Side Rendering)
import { provideHttpClient, withFetch } from '@angular/common/http';

// Configuración de la aplicación con HttpClient habilitado
export const appConfig: ApplicationConfig = {
  providers: [
    // provideHttpClient(withFetch()): configura HTTP con fetch API
    // Permite hacer peticiones GET, POST, PUT, DELETE a servidores
    provideHttpClient(withFetch()),
  ],
};
