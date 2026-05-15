import { Directive, Input, TemplateRef, ViewContainerRef, inject, OnInit } from '@angular/core';
import { PermissionStore } from '../store/permission.store';

/**
 * Structural directive — renders content only if user has the required permission.
 *
 * @example
 * ```html
 * <button *xHasPermission="{ moduleId: 100, actionId: 1 }">Delete</button>
 * ```
 */
@Directive({
  selector: '[xHasPermission]',
  standalone: true,
})
export class HasPermissionDirective implements OnInit {
  @Input() xHasPermission!: { moduleId: number; actionId: number };

  private readonly store = inject(PermissionStore);
  private readonly tpl = inject(TemplateRef);
  private readonly vcr = inject(ViewContainerRef);

  ngOnInit(): void {
    const { moduleId, actionId } = this.xHasPermission;
    if (this.store.hasPermission(moduleId, actionId)) {
      this.vcr.createEmbeddedView(this.tpl);
    }
  }
}
