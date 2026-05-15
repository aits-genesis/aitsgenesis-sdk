import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ReportService, ReportParams } from '../service/report.service';
import { ReportRenderTypeEnum } from '@aits-genesis/models';

/**
 * A button that triggers a report download.
 *
 * @example
 * ```html
 * <x-report-button
 *   label="Export PDF"
 *   endpoint="/HrReport/EmployeeList"
 *   [body]="{ deptId }"
 *   filename="employees.pdf"
 * />
 * ```
 */
@Component({
  selector: 'x-report-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="x-report-btn" [disabled]="loading" (click)="download()">
      @if (loading) {
        <span>Generating…</span>
      } @else {
        <span>{{ label }}</span>
      }
    </button>
  `,
})
export class XReportButtonComponent {
  @Input() label = 'Export';
  @Input() endpoint!: string;
  @Input() body?: Record<string, unknown>;
  @Input() filename?: string;
  @Input() renderType: ReportRenderTypeEnum = ReportRenderTypeEnum.Pdf;
  @Output() downloaded = new EventEmitter<Blob>();
  @Output() downloadError = new EventEmitter<unknown>();

  loading = false;

  private readonly reportSvc = inject(ReportService);

  download(): void {
    this.loading = true;
    const params: ReportParams = {
      endpoint: this.endpoint,
      body: this.body,
      filename: this.filename,
      renderType: this.renderType,
    };
    this.reportSvc.download(params).subscribe({
      next: (blob) => {
        this.loading = false;
        this.downloaded.emit(blob);
      },
      error: (err) => {
        this.loading = false;
        this.downloadError.emit(err);
      },
    });
  }
}
