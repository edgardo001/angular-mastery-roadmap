// =============================================================================
// ARCHIVO: main.ts
// PROPÓSITO: Punto de entrada que inicia la aplicación Angular i18n
// =============================================================================
//
// Este archivo arranca una app que demuestra internacionalización (i18n):
// la capacidad de una app de mostrar contenido en diferentes idiomas.
//
// i18n = "internationalization" (18 letras entre la 'i' y la 'n').
// Es como tener un traductor automático integrado en tu app.
// =============================================================================

// bootstrapApplication: Función que inicializa la app standalone
import { bootstrapApplication } from '@angular/platform-browser';

// Configuración que incluye locale (idioma) y providers de i18n
import { appConfig } from './app/app.config';

// Componente raíz que muestra el contenido traducible
import { App } from './app/app';

// Enciende la app con soporte para múltiples idiomas
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
