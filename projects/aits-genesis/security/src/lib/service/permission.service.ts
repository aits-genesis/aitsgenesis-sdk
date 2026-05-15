import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserPermissionsDto } from '@aits-genesis/models';
import { XHttpService } from '@aits-genesis/http';
import { PermissionStore } from '../store/permission.store';

@Injectable({ providedIn: 'root' })
export class PermissionService extends XHttpService {
  private readonly store = inject(PermissionStore);

  /** Load permissions from `GET /Authorization/GetUserPermission` */
  loadPermissions(): Observable<UserPermissionsDto> {
    return this.get<UserPermissionsDto>('/Authorization/GetUserPermission').pipe(
      tap((data) => this.store.setPermissions(data)),
    );
  }
}
