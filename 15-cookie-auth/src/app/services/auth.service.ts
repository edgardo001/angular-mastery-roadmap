import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/auth';
  isLoggedIn = signal<boolean>(false);
  user = signal<User | null>(null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((user) => {
        this.user.set(user);
        this.isLoggedIn.set(true);
      }),
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.user.set(null);
        this.isLoggedIn.set(false);
      }),
    );
  }

  checkSession(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/status`).pipe(
      tap((user) => {
        this.user.set(user);
        this.isLoggedIn.set(true);
      }),
    );
  }
}
