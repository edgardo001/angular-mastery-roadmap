/**
 * Admin App - Punto de entrada
 *
 * Esta es una de las apps del monorepo Nx.
 * Nx permite compartir código entre apps via libs/.
 * Cada app tiene su propio build y puede desplegarse independientemente.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
