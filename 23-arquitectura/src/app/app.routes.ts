/**
 * DEFINICIÓN DE RUTAS (app.routes.ts)
 * =====================================
 *
 * Define las rutas de la aplicación Angular.
 * Las rutas mapean URLs a componentes que se muestran.
 *
 * ANÁLOGÍA: Es como un mapa de carreteras:
 * - "/" es la autopista principal
 * - "/dashboard" es una calle residencial
 * - "/auth/login" es una entrada privada
 *
 * PALABRAS CLAVE:
 * - Routes: Tipo que define la estructura de rutas
 * - path: La URL que el usuario escribe en el navegador
 * - component: El componente que se muestra cuando se visita esa ruta
 * - children: Rutas anidadas dentro de una ruta padre
 * - redirectTo: Redirige una ruta a otra
 * - pathMatch: Cómo matchear la ruta ('full' = ruta exacta)
 *
 * ESTRUCTURA DE RUTAS:
 * - Ruta raíz (''): Usa MainLayoutComponent (con sidebar)
 *   - /dashboard: DashboardPage
 *   - /products: ProductListPage
 * - Ruta /auth: Usa AuthLayoutComponent (sin sidebar)
 *   - /auth/login: LoginPage
 */

// Routes: Tipo de Angular que define las rutas
import { Routes } from '@angular/router';

// Layouts: Componentes que envuelven las páginas
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

// Páginas: Componentes que se muestran en cada ruta
import { DashboardPage } from './features/dashboard/pages/dashboard.page';
import { ProductListPage } from './features/products/pages/product-list.page';
import { LoginPage } from './features/auth/pages/login.page';

// Define las rutas de la aplicación
export const routes: Routes = [
  {
    // Ruta raíz: Usa MainLayoutComponent como layout
    path: '',
    component: MainLayoutComponent,
    // children: Rutas anidadas dentro del layout principal
    children: [
      // /dashboard: Muestra el DashboardPage
      { path: 'dashboard', component: DashboardPage },
      // /products: Muestra el ProductListPage
      { path: 'products', component: ProductListPage },
      // Ruta vacía redirige a /dashboard
      // pathMatch: 'full': Solo redirige si la ruta es exactamente ""
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
  {
    // Ruta /auth: Usa AuthLayoutComponent (layout para autenticación)
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      // /auth/login: Muestra el LoginPage
      { path: 'login', component: LoginPage },
    ],
  },
];
