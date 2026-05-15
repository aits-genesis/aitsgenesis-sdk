import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

/** Register UI module providers (no-op currently — all components are standalone). */
export function provideXUI(): EnvironmentProviders {
  return makeEnvironmentProviders([]);
}
