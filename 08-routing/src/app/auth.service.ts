import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly isLoggedIn = signal(false);
  readonly role = signal<'user' | 'admin'>('user');

  login(role: 'user' | 'admin' = 'user') {
    this.isLoggedIn.set(true);
    this.role.set(role);
  }

  logout() {
    this.isLoggedIn.set(false);
    this.role.set('user');
  }
}
