import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PermissionStore } from '../store/permission.store';

/**
 * Route guard that checks module permissions.
 *
 * @example
 * ```ts
 * {
 *   path: 'users',
 *   canActivate: [permissionGuard],
 *   data: { moduleId: ModuleGroupEnum.Security, actionId: ActionEnum.View }
 * }
 * ```
 */
export const permissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const store = inject(PermissionStore);
  const router = inject(Router);

  const { moduleId, actionId } = route.data as { moduleId: number; actionId: number };
  if (store.hasPermission(moduleId, actionId)) return true;
  return router.createUrlTree(['/forbidden']);
};
