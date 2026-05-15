import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@aits-genesis/auth';

/** Ensures org is selected before accessing org-scoped routes. */
export const orgGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!authStore.needsOrgSelection()) return true;
  return router.createUrlTree(['/select-org']);
};
