import { Injectable, signal, computed } from '@angular/core';
import { AuthState, JwtClaims } from '@aits-genesis/models';

/** Signal-based reactive auth state. Single source of truth for authentication. */
@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly _state = signal<AuthState>({
    accessToken: null,
    claims: null,
    activeOrgId: null,
    isAuthenticated: false,
  });

  readonly state = this._state.asReadonly();

  readonly isAuthenticated = computed(() => this._state().isAuthenticated);
  readonly claims = computed(() => this._state().claims);
  readonly accessToken = computed(() => this._state().accessToken);
  readonly activeOrgId = computed(() => this._state().activeOrgId);
  readonly isMultiOrg = computed(() => this._state().claims?.isMultiOrg === 'true');
  readonly needsOrgSelection = computed(
    () => this.isAuthenticated() && this.isMultiOrg() && !this.activeOrgId(),
  );

  setAuthenticated(token: string, claims: JwtClaims): void {
    this._state.set({
      accessToken: token,
      claims,
      activeOrgId: claims.organizationId ?? null,
      isAuthenticated: true,
    });
  }

  setActiveOrg(orgId: string): void {
    this._state.update((s) => ({ ...s, activeOrgId: orgId }));
  }

  clearAuth(): void {
    this._state.set({ accessToken: null, claims: null, activeOrgId: null, isAuthenticated: false });
  }
}
