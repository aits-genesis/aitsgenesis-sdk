import { InjectionToken, VERSION } from '@angular/core';

/** Injection token carrying the AITS Genesis SDK version string. */
export const AITS_GENESIS_VERSION = new InjectionToken<string>('AITS_GENESIS_VERSION', {
  providedIn: 'root',
  factory: () => '0.0.1',
});

/** Injection token carrying the host Angular version. */
export const ANGULAR_VERSION = new InjectionToken<string>('ANGULAR_VERSION', {
  providedIn: 'root',
  factory: () => VERSION.full,
});
