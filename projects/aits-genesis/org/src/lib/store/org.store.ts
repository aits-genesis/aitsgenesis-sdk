import { Injectable, signal, computed } from '@angular/core';
import { OrgState, OrgSliDto } from '../model';

/** Signal-based org context store. */
@Injectable({ providedIn: 'root' })
export class OrgStore {
  private readonly _state = signal<OrgState>({ orgs: [], activeOrgId: null, loaded: false });

  readonly state = this._state.asReadonly();
  readonly orgs = computed(() => this._state().orgs);
  readonly activeOrgId = computed(() => this._state().activeOrgId);
  readonly loaded = computed(() => this._state().loaded);
  readonly activeOrg = computed(
    () => this._state().orgs.find((o) => o.id === this._state().activeOrgId) ?? null,
  );

  setOrgs(orgs: OrgSliDto[]): void {
    this._state.update((s) => ({ ...s, orgs, loaded: true }));
  }

  setActiveOrg(orgId: string): void {
    this._state.update((s) => ({ ...s, activeOrgId: orgId }));
  }

  clearOrgs(): void {
    this._state.set({ orgs: [], activeOrgId: null, loaded: false });
  }
}
