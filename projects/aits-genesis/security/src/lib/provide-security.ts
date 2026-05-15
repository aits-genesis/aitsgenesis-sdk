import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

/** Register security services. Call after `provideXAuth` and `provideXHttp`. */
export function provideXSecurity(): EnvironmentProviders {
  return makeEnvironmentProviders([]);
}
