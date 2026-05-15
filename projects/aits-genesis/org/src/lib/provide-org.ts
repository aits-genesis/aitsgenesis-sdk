import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

/** Register org context services. */
export function provideXOrg(): EnvironmentProviders {
  return makeEnvironmentProviders([]);
}
