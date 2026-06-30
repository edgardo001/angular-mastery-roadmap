// ApplicationConfig: configuración de la aplicación Angular
import { ApplicationConfig } from '@angular/core';
// provideCharts: configura ng2-charts con Chart.js
// withDefaultRegisterables: registra todos los tipos de gráficos (bar, line, pie, etc.)
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

// Configuración con soporte para gráficos
export const appConfig: ApplicationConfig = {
  providers: [
    // provideCharts: habilita ng2-charts en toda la aplicación
    // withDefaultRegisterables: carga los componentes de Chart.js automáticamente
    provideCharts(withDefaultRegisterables()),
  ],
};
