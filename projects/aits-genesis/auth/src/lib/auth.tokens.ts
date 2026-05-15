import { InjectionToken } from '@angular/core';

/** Base URL of the identity/auth server — e.g., `https://api.xalorith.com` */
export const XALORITH_AUTH_URL = new InjectionToken<string>('XALORITH_AUTH_URL');
