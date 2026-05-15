import { InjectionToken } from '@angular/core';

/** Base URL for all Xalorith API calls — e.g., `https://api.xalorith.com/api` */
export const XALORITH_API_URL = new InjectionToken<string>('XALORITH_API_URL');
