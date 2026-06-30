import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  {
    path: 'notes',
    loadComponent: () => import('./notes/notes.component').then(m => m.NotesComponent),
  },
];
