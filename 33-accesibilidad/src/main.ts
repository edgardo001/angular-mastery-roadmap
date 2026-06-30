/**
 * Punto de entrada de la aplicación de Accesibilidad Angular.
 *
 * bootstrapApplication() arranca la aplicación standalone con el componente raíz.
 * Es el "botón de encendido" de la aplicación Angular.
 *
 * En este ejemplo se demuestran técnicas de accesibilidad (a11y):
 * - LiveAnnouncer: Notificar a lectores de pantalla
 * - Focus Trap: Atrapar el foco dentro de modales
 * - ARIA: Atributos para asistencia tecnológica
 * - Contraste de color: Cumplimiento WCAG 2.1
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch(console.error);
