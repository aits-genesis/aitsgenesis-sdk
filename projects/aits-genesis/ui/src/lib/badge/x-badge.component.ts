import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type XBadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'x-badge',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="x-badge x-badge--{{ variant }}">{{ label }}</span>
  `,
})
export class XBadgeComponent {
  @Input() label = '';
  @Input() variant: XBadgeVariant = 'default';
}
