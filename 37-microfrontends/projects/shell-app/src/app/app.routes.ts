/**
 * Rutas del Shell App con carga dinámica de microfrontends.
 *
 * loadRemoteModule — Función de @angular-architects/module-federation
 *   que descarga y registra un módulo expuesto por un remote en tiempo de ejecución.
 *   Es el corazón de Module Federation: permite cargar código de otra app
 *   sin tenerlo compilado en tu bundle.
 *
 * loadChildren — Lazy loading nativo de Angular Router.
 *   Aquí se combina con loadRemoteModule para que al navegar a /remote,
 *   el Router descargue el componente desde el remote en localhost:4201.
 *
 * Analogía: Es como pedir un libro prestado a otra biblioteca (remote).
 *   No tienes el libro en tu estantería (bundle), pero lo consultas
 *   en tiempo real cuando lo necesitas (al navegar a la ruta).
 */
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'remote',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './RemoteFeature',
      }).then(m => m.RemoteFeatureComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
