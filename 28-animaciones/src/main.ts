// =============================================================================
// ARCHIVO: main.ts
// PROPÓSITO: Punto de entrada que inicia la aplicación Angular en el navegador
// =============================================================================
//
// Este archivo arranca la app de animaciones de Angular.
// Las animaciones mejoran la experiencia del usuario al hacer transiciones
// suaves entre estados, como cuando algo aparece, desaparece o se mueve.
//
// Piensa en las animaciones como los efectos especiales de una película:
// sin ellas la historia se cuenta, pero con ellas se vuelve más fluida.
// =============================================================================

// bootstrapApplication: Función que inicializa la app standalone de Angular.
import { bootstrapApplication } from '@angular/platform-browser';

// Configuración de la app (incluye provideAnimations para habilitar animaciones)
import { appConfig } from './app/app.config';

// Componente raíz de la app
import { App } from './app/app';

// Enciende la app. Las animaciones estarán disponibles en todos los componentes
// porque provideAnimations() está configurado en appConfig.
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
