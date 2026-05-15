import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { XHttpService } from '@aits-genesis/http';
import { ReportRenderTypeEnum } from '@aits-genesis/models';

export interface ReportParams {
  endpoint: string;
  body?: Record<string, unknown>;
  renderType?: ReportRenderTypeEnum;
  filename?: string;
}

/**
 * Service for downloading reports from the Xalorith reporting engine.
 * Reports are generated server-side and returned as binary PDF/Excel/CSV blobs.
 *
 * @example
 * ```ts
 * reportService.download({
 *   endpoint: '/HrReport/EmployeeList',
 *   body: { departmentId },
 *   filename: 'employee-list.pdf',
 * }).subscribe();
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ReportService extends XHttpService {
  /** Download a report and trigger browser download */
  download(params: ReportParams): Observable<Blob> {
    const body = {
      ...(params.body ?? {}),
      renderType: params.renderType ?? ReportRenderTypeEnum.Pdf,
    };

    return new Observable((observer) => {
      this.postBlob(params.endpoint, body).subscribe({
        next: (blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = params.filename ?? `report.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          observer.next(blob);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  /** Get report as blob without triggering download */
  getBlob(params: ReportParams): Observable<Blob> {
    const body = {
      ...(params.body ?? {}),
      renderType: params.renderType ?? ReportRenderTypeEnum.Pdf,
    };
    return this.postBlob(params.endpoint, body);
  }
}
