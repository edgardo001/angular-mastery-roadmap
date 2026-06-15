import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

interface User { username: string; }

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSignal = signal<User | null>(null);
  readonly user = this.userSignal.asReadonly();
  private accessToken = '';
  private refreshToken = '';

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('auth_tokens');
    if (stored) {
      const parsed = JSON.parse(stored);
      this.accessToken = parsed.accessToken;
      this.refreshToken = parsed.refreshToken;
      this.userSignal.set({ username: this.decodeUsername(parsed.accessToken) });
    }
  }

  login(username: string, password: string) {
    return this.http.post<AuthResponse>('/auth/login', { username, password }).pipe(
      tap(res => this.setTokens(res))
    );
  }

  register(username: string, password: string) {
    return this.http.post('/auth/register', { username, password });
  }

  refresh() {
    return this.http.post<AuthResponse>('/auth/refresh', { refreshToken: this.refreshToken }).pipe(
      tap(res => this.setTokens(res))
    );
  }

  logout() {
    this.accessToken = '';
    this.refreshToken = '';
    this.userSignal.set(null);
    localStorage.removeItem('auth_tokens');
  }

  getAccessToken(): string { return this.accessToken; }

  getProtected() {
    return this.http.get('/api/protected');
  }

  private setTokens(res: AuthResponse) {
    this.accessToken = res.accessToken;
    this.refreshToken = res.refreshToken;
    localStorage.setItem('auth_tokens', JSON.stringify(res));
    this.userSignal.set({ username: this.decodeUsername(res.accessToken) });
  }

  private decodeUsername(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || payload.unique_name || 'unknown';
    } catch {
      return 'unknown';
    }
  }
}
