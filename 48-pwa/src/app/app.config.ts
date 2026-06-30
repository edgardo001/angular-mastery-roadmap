// ApplicationConfig: configuración de la aplicación Angular
import { ApplicationConfig, isDevMode } from '@angular/core';
// provideServiceWorker: habilita el Service Worker para PWA
import { provideServiceWorker } from '@angular/service-worker';

// Configuración de la aplicación con Service Worker para PWA
export const appConfig: ApplicationConfig = {
  providers: [
    // provideServiceWorker: registra el Service Worker que maneja caché y actualizaciones
    provideServiceWorker('ngsw-worker.js', {
      // enabled: solo en producción (no en desarrollo para evitar problemas de caché)
      enabled: !isDevMode(),
      // registrationStrategy: cuándo registrar el Service Worker
      // 'registerWhenStable:3000': espera 3 segundos o hasta que la app esté estable
      registrationStrategy: 'registerWhenStable:3000',
    }),
  ],
};
