import { Pipe, PipeTransform } from '@angular/core';
import { formatFileSize } from '@aits-genesis/utils';

@Pipe({ name: 'xFileSize', standalone: true })
export class FileSizePipe implements PipeTransform {
  transform(bytes: number | null | undefined): string {
    if (bytes == null) return '--';
    return formatFileSize(bytes);
  }
}
