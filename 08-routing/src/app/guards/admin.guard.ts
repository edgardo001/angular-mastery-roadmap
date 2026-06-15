import { inject } from '@angular/core';
import { AuthService } from '../auth.service';

export const adminGuardFn = () => {
  const auth = inject(AuthService);
  return auth.role() === 'admin';
};
