import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, throwError } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = '/api/auth';
  private state = signal<AuthState>({ user: null, accessToken: null, refreshToken: null });

  isLoggedIn = computed(() => this.state().accessToken !== null);
  isAdmin = computed(() => this.state().user?.role === 'admin');
  currentUser = computed(() => this.state().user);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    const stored = localStorage.getItem('auth');
    if (stored) {
      try { this.state.set(JSON.parse(stored)); } catch { /* ignore */ }
    }

    effect(() => {
      const s = this.state();
      if (s.accessToken) {
        localStorage.setItem('auth', JSON.stringify(s));
      } else {
        localStorage.removeItem('auth');
      }
    });
  }

  getAccessToken(): string | null {
    return this.state().accessToken;
  }

  decodeToken(token: string): Record<string, unknown> | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      return JSON.parse(atob(parts[1]));
    } catch {
      return null;
    }
  }

  login(email: string, password: string) {
    return this.http.post<AuthState>(`${this.API}/login`, { email, password }).pipe(
      tap(res => this.state.set(res)),
    );
  }

  refreshTokens() {
    const token = this.state().refreshToken;
    if (!token) return throwError(() => new Error('No refresh token'));
    return this.http.post<{ accessToken: string; refreshToken: string }>(
      `${this.API}/refresh`,
      { refreshToken: token },
    ).pipe(
      tap(res => {
        this.state.update(s => ({ ...s, ...res }));
      }),
    );
  }

  logout() {
    this.state.set({ user: null, accessToken: null, refreshToken: null });
    this.router.navigate(['/login']);
  }
}
