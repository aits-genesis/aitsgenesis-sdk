import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Output, EventEmitter, Input } from '@angular/core';

/**
 * File upload form control wrapper.
 * Works with `POST /FileBank/Upload` — emits the selected files on change.
 */
@Component({
  selector: 'x-file-control',
  standalone: true,
  template: `
    <input
      type="file"
      [attr.accept]="accept"
      [attr.multiple]="multiple || null"
      (change)="onFileChange($event)"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileControlComponent),
      multi: true,
    },
  ],
})
export class FileControlComponent implements ControlValueAccessor {
  @Input() accept = '*/*';
  @Input() multiple = false;
  @Output() fileSelected = new EventEmitter<File[]>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onChange: (v: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _onTouched: () => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  writeValue(): void {}
  registerOnChange(fn: (v: unknown) => void): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    this.fileSelected.emit(files);
    this._onChange(files);
    this._onTouched();
  }
}
