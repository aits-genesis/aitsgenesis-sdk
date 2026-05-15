import { Injectable, signal, computed } from '@angular/core';
import { UserPermissionsDto, MenuDto, UserModulePermissionDto } from '@aits-genesis/models';

/** Signal-based permission store. Populated after login by {@link PermissionService}. */
@Injectable({ providedIn: 'root' })
export class PermissionStore {
  private readonly _permissions = signal<UserModulePermissionDto[]>([]);
  private readonly _menus = signal<MenuDto[]>([]);
  private readonly _loaded = signal(false);

  readonly permissions = this._permissions.asReadonly();
  readonly menus = this._menus.asReadonly();
  readonly loaded = this._loaded.asReadonly();

  /** Check if the user has a specific action on a module */
  readonly canPerform = computed(() => (moduleId: number, actionId: number): boolean => {
    return this._permissions().some(
      (p) => p.moduleId === moduleId && p.actionIds.includes(actionId),
    );
  });

  setPermissions(data: UserPermissionsDto): void {
    this._permissions.set(data.userPermissions);
    this._menus.set(data.userMenus);
    this._loaded.set(true);
  }

  clearPermissions(): void {
    this._permissions.set([]);
    this._menus.set([]);
    this._loaded.set(false);
  }

  hasPermission(moduleId: number, actionId: number): boolean {
    return this.canPerform()(moduleId, actionId);
  }
}
