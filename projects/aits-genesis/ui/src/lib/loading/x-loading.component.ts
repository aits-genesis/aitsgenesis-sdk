import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'x-loading',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (loading) {
      <div class="x-loading">
        <div class="x-loading__spinner" role="status" [attr.aria-label]="label"></div>
        @if (label) {
          <span class="x-loading__label">{{ label }}</span>
        }
      </div>
    }
  `,
})
export class XLoadingComponent {
  @Input() loading = false;
  @Input() label = 'Loading…';
}
