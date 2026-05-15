import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { FormBuilder } from '@angular/forms';

/** Register form utilities. */
export function provideXForms(): EnvironmentProviders {
  return makeEnvironmentProviders([FormBuilder]);
}
