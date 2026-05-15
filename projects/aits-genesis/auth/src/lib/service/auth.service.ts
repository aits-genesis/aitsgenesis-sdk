import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
   * Authenticate via OpenIdConnect resource owner password grant.
   * Token is stored in-memory only.
   */
  login(credentials: LoginVm): Observable<TokenResponse> {
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', credentials.clientId)
      .set('client_secret', credentials.clientSecret)
      .set('username', credentials.username)
      .set('password', credentials.password)
      .set('scope', 'openid profile email');

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<TokenResponse>(`${this.authUrl}/connect/token`, body, { headers }).pipe(
      tap((res) => {
        this.tokenSvc.setToken(res.access_token);
        const claims = this.tokenSvc.decode(res.access_token);
        if (claims) this.store.setAuthenticated(res.access_token, claims);
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
