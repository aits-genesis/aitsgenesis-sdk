import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Xalorith-specific form validators */
export class XValidators {
  /** Validates a Bangladeshi mobile number */
  static bdPhone(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valid = /^(?:\+?88)?01[3-9]\d{8}$/.test(String(control.value).replace(/\s+/g, ''));
      return valid ? null : { bdPhone: { value: control.value } };
    };
  }

  /** Validates that value is a valid UUID */
  static guid(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valid =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          control.value,
        );
      return valid ? null : { guid: { value: control.value } };
    };
  }

  /** Min value for numeric controls */
  static minValue(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null || control.value === '') return null;
      return Number(control.value) >= min ? null : { minValue: { min, actual: control.value } };
    };
  }

  /** Validates that end date is after start date */
  static dateRange(startKey: string, endKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const start = group.get(startKey)?.value;
      const end = group.get(endKey)?.value;
      if (!start || !end) return null;
      return new Date(end) > new Date(start) ? null : { dateRange: { start, end } };
    };
  }
}
