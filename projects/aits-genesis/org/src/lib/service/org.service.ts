import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { XHttpService } from '@aits-genesis/http';
import { OrgStore } from '../store/org.store';
import { OrgSliDto } from '../model';
import { AuthService } from '@aits-genesis/auth';

@Injectable({ providedIn: 'root' })
export class OrgService extends XHttpService {
  private readonly store = inject(OrgStore);
  private readonly authSvc = inject(AuthService);

  /** Load available organizations for the current user */
  loadOrgs(): Observable<OrgSliDto[]> {
    return this.get<OrgSliDto[]>('/Organization/GetUserOrganizations').pipe(
      tap((orgs) => this.store.setOrgs(orgs)),
    );
  }

  /** Switch to a different organization context */
  switchOrg(orgId: string): void {
    this.store.setActiveOrg(orgId);
    this.authSvc.selectOrg(orgId);
  }
}
