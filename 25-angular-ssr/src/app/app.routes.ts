import { Routes } from '@angular/router';
import { BlogPage } from './pages/blog-page/blog-page';

export const routes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  { path: 'blog', component: BlogPage },
  { path: 'blog/:id', component: BlogPage }
];
