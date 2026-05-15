import { InjectionToken, VERSION as AngularVersion } from '@angular/core';

/** Injected SDK version string */
export const AITS_GENESIS_VERSION = new InjectionToken<string>('AITS_GENESIS_VERSION', {
  providedIn: 'root',
  factory: () => '0.0.0',
});

/** Injected Angular version */
export const ANGULAR_VERSION = new InjectionToken<string>('ANGULAR_VERSION', {
  providedIn: 'root',
  factory: () => AngularVersion.full,
});

/** Base URL for API calls — shortcut alias for XALORITH_API_URL */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

/** Xalorith SDK configuration object */
export interface XalorithConfig {
  /** Backend API base URL — no trailing slash. E.g. `https://api.xalorith.com/api` */
  apiUrl: string;
  /** Identity server URL — no trailing slash. E.g. `https://api.xalorith.com` */
  authServerUrl: string;
  /** OAuth2 client ID issued by the identity server */
  clientId: string;
  /** OAuth2 client secret issued by the identity server */
  clientSecret: string;
}

/** Injection token for the root SDK config */
export const XALORITH_CONFIG = new InjectionToken<XalorithConfig>('XALORITH_CONFIG');
