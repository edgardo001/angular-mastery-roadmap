// ApplicationConfig: configuración de la aplicación Angular
import { ApplicationConfig } from '@angular/core';

// Configuración vacía: no necesitamos providers especiales
// XState se usa directamente en los componentes sin necesidad de inyectarlo
export const appConfig: ApplicationConfig = {
  providers: [], // No hay servicios adicionales que configurar
};
