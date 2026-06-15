import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardPage } from './features/dashboard/pages/dashboard.page';
import { ProductListPage } from './features/products/pages/product-list.page';
import { LoginPage } from './features/auth/pages/login.page';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardPage },
      { path: 'products', component: ProductListPage },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginPage },
    ],
  },
];
