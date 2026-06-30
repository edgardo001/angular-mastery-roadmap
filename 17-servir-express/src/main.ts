// ============================================================================
// ARCHIVO PRINCIPAL DE ARRANQUE (main.ts)
// ============================================================================
// Punto de entrada de la aplicación Angular que será servida por Express.js.
// Express actúa como el servidor web que entrega los archivos compilados.

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// .catch() captura errores si la aplicación falla al iniciar
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
