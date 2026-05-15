import { Pipe, PipeTransform } from '@angular/core';
import { enumLabel } from '@aits-genesis/utils';

/** Convert a numeric enum value to its label string */
@Pipe({ name: 'xEnumLabel', standalone: true })
export class EnumLabelPipe implements PipeTransform {
  transform<T extends Record<string, string | number>>(value: number | string, enumObj: T): string {
    return enumLabel(enumObj, value);
  }
}
