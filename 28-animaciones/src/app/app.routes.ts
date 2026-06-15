import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.HomePage) },
  { path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.AboutPage) }
];
