import { EnvironmentProviders, Provider } from '@angular/core';
import { provideXAuth } from '@aits-genesis/auth';
import { provideXHttp } from '@aits-genesis/http';
import { provideXSecurity } from '@aits-genesis/security';
import { provideXOrg } from '@aits-genesis/org';
import { provideXForms } from '@aits-genesis/forms';
import { provideXUI } from '@aits-genesis/ui';
import { provideXReporting } from '@aits-genesis/reporting';
import { XalorithConfig, XALORITH_CONFIG } from './core';

/**
 * Master provider for the entire Xalorith Angular SDK.
 * Registers all SDK services, interceptors, and tokens.
 *
 * @example
 * ```ts
 * // app.config.ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideXalorithSdk({
 *       apiUrl: 'https://api.xalorith.com/api',
 *       authServerUrl: 'https://api.xalorith.com',
 *       clientId: 'xalorith-web',
 *       clientSecret: 'YOUR_SECRET',
 *     }),
 *   ],
 * };
 * ```
 */
export function provideXalorithSdk(config: XalorithConfig): (EnvironmentProviders | Provider)[] {
  return [
    { provide: XALORITH_CONFIG, useValue: config } as Provider,
    provideXAuth({ authServerUrl: config.authServerUrl }),
    provideXHttp({ apiUrl: config.apiUrl }),
    provideXSecurity(),
    provideXOrg(),
    provideXForms(),
    provideXUI(),
    provideXReporting(),
  ];
}
