import { Injectable } from '@angular/core';
import { JwtClaims } from '@aits-genesis/models';

/** In-memory token storage — never stored in localStorage to prevent XSS token theft. */
@Injectable({ providedIn: 'root' })
export class TokenService {
  private _accessToken: string | null = null;

  get accessToken(): string | null {
    return this._accessToken;
  }

  setToken(token: string): void {
    this._accessToken = token;
  }

  clearToken(): void {
    this._accessToken = null;
  }

  /**
   * Decode JWT payload without signature verification.
   * Signature is verified by the backend on every API call.
   */
  decode(token: string): JwtClaims | null {
    try {
      const [, payload] = token.split('.');
      const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(json) as JwtClaims;
    } catch {
      return null;
    }
  }

  isExpired(token: string): boolean {
    const claims = this.decode(token);
    if (!claims) return true;
    return claims.exp * 1000 < Date.now();
  }
}
