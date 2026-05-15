import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

const ERROR_MESSAGES: Record<string, (e: Record<string, unknown>) => string> = {
  required: () => 'This field is required.',
  minlength: (e) => `Minimum ${e['requiredLength']} characters required.`,
  maxlength: (e) => `Maximum ${e['requiredLength']} characters allowed.`,
  email: () => 'Enter a valid email address.',
  bdPhone: () => 'Enter a valid Bangladeshi phone number.',
  guid: () => 'Invalid ID format.',
  minValue: (e) => `Value must be at least ${e['min']}.`,
  dateRange: () => 'End date must be after start date.',
};

/** Transforms ValidationErrors into a user-friendly message. */
@Pipe({ name: 'xValidationMessage', standalone: true })
export class ValidationMessagePipe implements PipeTransform {
  transform(errors: ValidationErrors | null): string {
    if (!errors) return '';
    const [key, value] = Object.entries(errors)[0];
    return ERROR_MESSAGES[key]?.(value as Record<string, unknown>) ?? `Validation error: ${key}`;
  }
}
