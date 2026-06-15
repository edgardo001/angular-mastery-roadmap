import { Injectable, inject, signal } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly oidc = inject(OidcSecurityService);

  readonly isAuthenticated = signal(false);
  readonly userData = signal<Record<string, unknown> | null>(null);

  constructor() {
    this.oidc.checkAuth().subscribe((loginResponse) => {
      this.isAuthenticated.set(loginResponse.isAuthenticated);
      this.userData.set(loginResponse.userData ?? null);
    });

    this.oidc.isAuthenticated$.subscribe((result) =>
      this.isAuthenticated.set(result.isAuthenticated),
    );
    this.oidc.userData$.subscribe((result) =>
      this.userData.set(result.userData ?? null),
    );
  }

  login(): void {
    this.oidc.authorize();
  }

  logout(): void {
    this.oidc.logoff().subscribe();
  }
}
