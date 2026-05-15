import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'x-empty-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="x-empty-state">
      <span class="x-empty-state__icon">{{ icon }}</span>
      <h3 class="x-empty-state__title">{{ title }}</h3>
      @if (description) {
        <p class="x-empty-state__description">{{ description }}</p>
      }
      <ng-content />
    </div>
  `,
})
export class XEmptyStateComponent {
  @Input() icon = '📭';
  @Input() title = 'No data found';
  @Input() description?: string;
}
