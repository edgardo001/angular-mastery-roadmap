// ApplicationConfig: tipo que define la configuración de la aplicación
import { ApplicationConfig } from '@angular/core';

// Configuración de la aplicación - vacía porque no necesitamos providers especiales
// Los providers son servicios que Angular crea y gestiona (como HttpClient, Router, etc.)
// En este caso, solo usamos componentes standalone que no requieren providers adicionales
export const appConfig: ApplicationConfig = {
  providers: [], // Array vacío = no hay servicios adicionales que configurar
};
