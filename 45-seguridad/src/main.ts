// Importamos la función para iniciar una aplicación Angular standalone (sin NgModule)
import { bootstrapApplication } from '@angular/platform-browser';
// Importamos la configuración de la aplicación (providers, interceptors, etc.)
import { appConfig } from './app/app.config';
// Importamos el componente raíz de la aplicación
import { App } from './app/app';

// bootstrapApplication arranca la aplicación Angular en el navegador
// Es como encender una computadora: carga todos los componentes y servicios
// El primer parámetro es el componente raíz, el segundo es la configuración
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err)); // Si hay error al iniciar, lo mostramos en consola
