import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginVm, TokenResponse } from '@aits-genesis/models';
import { AuthStore } from '../store/auth.store';
import { TokenService } from '../token/token.service';
import { XALORITH_AUTH_URL } from '../auth.tokens';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly store = inject(AuthStore);
  private readonly tokenSvc = inject(TokenService);
  private readonly authUrl = inject(XALORITH_AUTH_URL);

  /**
   * Authenticate via Xalorith identity server (`POST /connect/token`).
   *
   * The backend accepts a JSON body (not form-encoded) whose keys match the
   * `OpenIdConnectRequest` snake_case property names.  It responds with
   * `{ token: string, expiration: string }`.
   *
   * The JWT is stored in-memory only — never in localStorage — to prevent XSS
   * token theft.
   */
  login(credentials: LoginVm): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.authUrl}/connect/token`, credentials).pipe(
      tap((res) => {
        this.tokenSvc.setToken(res.token);
        const claims = this.tokenSvc.decode(res.token);
        if (claims) this.store.setAuthenticated(res.token, claims);
      }),
    );
  }

  logout(): void {
    this.tokenSvc.clearToken();
    this.store.clearAuth();
  }

  selectOrg(orgId: string): void {
    this.store.setActiveOrg(orgId);
  }
}
