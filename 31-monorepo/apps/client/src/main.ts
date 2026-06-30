/**
 * Client App - Punto de entrada
 *
 * Segunda app del monorepo Nx.
 * Comparte libs con la app admin pero tiene su propio ciclo de build.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
