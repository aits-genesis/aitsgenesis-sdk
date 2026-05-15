import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BasePaginatedDto, PaginationQuery } from '@aits-genesis/models';

export interface XTableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  /** Optional cell renderer — receives the row object */
  format?: (row: T) => string;
}

/**
 * Generic data table with built-in pagination, sorting, and empty state.
 *
 * @example
 * ```html
 * <x-data-table
 *   [data]="pagedUsers"
 *   [columns]="cols"
 *   [(query)]="query"
 *   (queryChange)="loadUsers()"
 * />
 * ```
 */
@Component({
  selector: 'x-data-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="x-table-wrapper">
      <table class="x-table">
        <thead>
          <tr>
            @for (col of columns; track col.key) {
              <th (click)="col.sortable && sortBy(col.key)">
                {{ col.label }}
                @if (col.sortable) {
                  <span class="sort-icon">↕</span>
                }
              </th>
            }
            @if (hasActions) {
              <th>Actions</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of data?.items; track $index) {
            <tr>
              @for (col of columns; track col.key) {
                <td>{{ col.format ? col.format(row) : getCellValue(row, col.key) }}</td>
              }
              @if (hasActions) {
                <td>
                  <ng-container *ngTemplateOutlet="actionsTemplate; context: { $implicit: row }" />
                </td>
              }
            </tr>
          }
          @if (!data?.items?.length) {
            <tr>
              <td [attr.colspan]="columns.length + (hasActions ? 1 : 0)" class="x-table__empty">
                No records found.
              </td>
            </tr>
          }
        </tbody>
      </table>
      <div class="x-table__pagination">
        <button [disabled]="query.pageNo <= 1" (click)="prevPage()">← Prev</button>
        <span>Page {{ query.pageNo }} of {{ totalPages }}</span>
        <button [disabled]="query.pageNo >= totalPages" (click)="nextPage()">Next →</button>
      </div>
    </div>
  `,
})
export class XDataTableComponent<T extends object> {
  @Input() data: BasePaginatedDto<T> | null = null;
  @Input() columns: XTableColumn<T>[] = [];
  @Input() query: PaginationQuery = { pageNo: 1, pageSize: 10 };
  @Input() hasActions = false;
  @Input() actionsTemplate: unknown = null;
  @Output() queryChange = new EventEmitter<PaginationQuery>();

  get totalPages(): number {
    if (!this.data) return 1;
    return Math.ceil(this.data.totalRecord / this.query.pageSize) || 1;
  }

  getCellValue(row: T, key: string | keyof T): string {
    const val = (row as Record<string, unknown>)[key as string];
    return val != null ? String(val) : '--';
  }

  sortBy(_key: string | keyof T): void {
    this.queryChange.emit({ ...this.query, pageNo: 1 });
  }

  prevPage(): void {
    if (this.query.pageNo <= 1) return;
    this.queryChange.emit({ ...this.query, pageNo: this.query.pageNo - 1 });
  }

  nextPage(): void {
    if (this.query.pageNo >= this.totalPages) return;
    this.queryChange.emit({ ...this.query, pageNo: this.query.pageNo + 1 });
  }
}
