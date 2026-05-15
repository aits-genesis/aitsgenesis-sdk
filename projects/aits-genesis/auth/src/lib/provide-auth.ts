import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptor/auth.interceptor';
import { XALORITH_AUTH_URL } from './auth.tokens';

export interface AuthConfig {
  /** Base URL of the identity server (no trailing slash) */
  authServerUrl: string;
}

/** Register auth services, interceptor, and token. */
export function provideXAuth(config: AuthConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: XALORITH_AUTH_URL, useValue: config.authServerUrl },
    provideHttpClient(withInterceptors([authInterceptor])),
  ]);
}
