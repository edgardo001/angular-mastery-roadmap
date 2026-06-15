import { Injectable, signal, computed, effect } from '@angular/core';

export interface AuthState {
  email: string;
  name: string;
  token: string;
}

const STORAGE_KEY = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private state = signal<AuthState | null>(null);

  readonly isLoggedIn = computed(() => this.state() !== null);
  readonly currentUser = computed(() => this.state());

  constructor() {
    this.loadFromStorage();

    effect(() => {
      const user = this.state();
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    });
  }

  login(email: string, password: string): boolean {
    if (!email || !password) return false;
    const name = email.split('@')[0];
    const token = btoa(`${email}:${Date.now()}`);
    this.state.set({ email, name, token });
    return true;
  }

  logout() {
    this.state.set(null);
  }

  loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        this.state.set(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }
}
