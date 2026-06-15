import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const oidc = inject(OidcSecurityService);
  const router = inject(Router);

  return oidc.isAuthenticated$.pipe(
    map((isAuth) => {
      if (!isAuth) {
        oidc.authorize();
        return false;
      }
      return true;
    }),
  );
};
