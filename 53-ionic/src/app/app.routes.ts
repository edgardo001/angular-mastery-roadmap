import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then(m => m.HomePage)
  },
  {
    path: 'camera',
    loadComponent: () => import('./camera/camera').then(m => m.CameraPage)
  },
  {
    path: 'gps',
    loadComponent: () => import('./gps/gps').then(m => m.GpsPage)
  }
];
