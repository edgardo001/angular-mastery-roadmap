// =============================================================================
// ARCHIVO: app.routes.ts
// PROPÓSITO: Define las rutas con lazy loading para las páginas
// =============================================================================
//
// Este archivo configura la navegación entre Home y About.
// Usa lazy loading (carga diferida) para optimizar el rendimiento:
// el código de cada página solo se carga cuando el usuario visita esa ruta.
//
// ¿Qué es lazy loading?
// Es como pedir pizza: en lugar de preparar todas las pizzas cuando
// abres el restaurante, solo preparas la que el cliente pide.
// Esto hace que la app inicie más rápido.
// =============================================================================

// Routes: Tipo para el array de rutas de Angular
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Ruta raíz → redirige a /home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Ruta /home → carga HomePage de forma lazy
  // loadComponent: Función asíncrona que importa el componente SOLO cuando se necesita.
  // () => import(...) es una función que retorna una Promise.
  // .then(m => m.HomePage) extrae la clase HomePage del módulo importado.
  //
  // Ventaja: El código de HomePage no se descarga hasta que el usuario
  // visita /home por primera vez. Mejora la carga inicial de la app.
  { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.HomePage) },

  // Ruta /about → carga AboutPage de forma lazy (misma lógica que home)
  { path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.AboutPage) }
];
