import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { xErrorInterceptor } from './interceptor/x-error.interceptor';
import { XALORITH_API_URL } from './http.tokens';

export interface XHttpConfig {
  /** Base URL for API calls — no trailing slash */
  apiUrl: string;
}

export function provideXHttp(config: XHttpConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: XALORITH_API_URL, useValue: config.apiUrl },
    provideHttpClient(withInterceptors([xErrorInterceptor])),
  ]);
}
