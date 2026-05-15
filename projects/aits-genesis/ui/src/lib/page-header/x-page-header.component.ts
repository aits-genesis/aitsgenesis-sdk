import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'x-page-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="x-page-header">
      <div class="x-page-header__content">
        <h1 class="x-page-header__title">{{ title }}</h1>
        @if (subtitle) {
          <p class="x-page-header__subtitle">{{ subtitle }}</p>
        }
      </div>
      <div class="x-page-header__actions">
        <ng-content />
      </div>
    </header>
  `,
})
export class XPageHeaderComponent {
  @Input() title = '';
  @Input() subtitle?: string;
}
