import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../store/auth.store';

/** Redirects unauthenticated users to `/login`. */
export const authGuard: CanActivateFn = (_route, _state) => {
  const store = inject(AuthStore);
  const router = inject(Router);

  if (store.isAuthenticated()) return true;
  return router.createUrlTree(['/login']);
};

/** Guard that ensures an org is selected for multi-org users. */
export const orgSelectedGuard: CanActivateFn = (_route, _state) => {
  const store = inject(AuthStore);
  const router = inject(Router);

  if (!store.needsOrgSelection()) return true;
  return router.createUrlTree(['/select-org']);
};
