import { Injectable, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  AbstractControlOptions,
  ValidatorFn,
  AsyncValidatorFn,
  Validators,
} from '@angular/forms';

/**
 * Typed form builder for Xalorith forms.
 * Provides a thin wrapper around Angular's FormBuilder with type inference helpers.
 *
 * @example
 * ```ts
 * const form = xfb.group({
 *   name: xfb.required(''),
 *   phone: xfb.control('', [XValidators.bdPhone()]),
 * });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class XFormBuilder {
  private readonly fb = inject(FormBuilder);

  /** Build a FormGroup */
  group(controls: Record<string, unknown>, options?: AbstractControlOptions): FormGroup {
    return this.fb.group(controls, options);
  }

  /** Required text control */
  required(value = ''): FormControl<string> {
    return this.fb.control(value, [Validators.required]) as FormControl<string>;
  }

  /** Optional control with validators */
  control<T>(
    value: T,
    validators?: ValidatorFn | ValidatorFn[],
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[],
  ): FormControl<T> {
    return this.fb.control<T>(
      value,
      validators ? { validators } : {},
      asyncValidators,
    ) as FormControl<T>;
  }

  /** GUID/select control — required */
  selectRequired(value: string | null = null): FormControl<string | null> {
    return this.fb.control(value, [Validators.required]) as FormControl<string | null>;
  }
}
