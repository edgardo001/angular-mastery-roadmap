import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthFeatureService {
  private readonly _user = signal<{ name: string; email: string } | null>(null);
  readonly user = this._user.asReadonly();

  setUser(user: { name: string; email: string }): void {
    this._user.set(user);
  }

  clearUser(): void {
    this._user.set(null);
  }
}
