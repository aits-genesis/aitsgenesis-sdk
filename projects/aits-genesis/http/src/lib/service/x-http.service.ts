import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { XHttpResponse, BasePaginatedDto, PaginationQuery } from '@aits-genesis/models';
import { cleanParams } from '@aits-genesis/utils';
import { XHttpError } from '../error/x-http-error';
import { XALORITH_API_URL } from '../http.tokens';

/**
 * Base HTTP service for Xalorith API.
 * Unwraps `XHttpResponse<T>` and throws `XHttpError` on failure.
 * Extend this class for module-specific services.
 *
 * @example
 * ```ts
 * @Injectable({ providedIn: 'root' })
 * export class UserService extends XHttpService {
 *   getAll(query: PaginationQuery) {
 *     return this.getList<UserDto>('/User/GetAll', query);
 *   }
 * }
 * ```
 */
@Injectable()
export class XHttpService {
  protected readonly http = inject(HttpClient);
  protected readonly baseUrl = inject(XALORITH_API_URL);

  /** GET request that unwraps XHttpResponse<T> */
  protected get<T>(path: string, params?: Record<string, unknown>): Observable<T> {
    const httpParams = new HttpParams({ fromObject: cleanParams(params ?? {}) });
    return this.http
      .get<XHttpResponse<T>>(`${this.baseUrl}${path}`, { params: httpParams })
      .pipe(map((res) => this.unwrap(res)));
  }

  /** GET paginated list */
  protected getList<T>(
    path: string,
    query: PaginationQuery & Record<string, unknown>,
  ): Observable<BasePaginatedDto<T>> {
    return this.get<BasePaginatedDto<T>>(path, query);
  }

  /** POST request */
  protected post<T>(path: string, body: unknown): Observable<T> {
    return this.http
      .post<XHttpResponse<T>>(`${this.baseUrl}${path}`, body)
      .pipe(map((res) => this.unwrap(res)));
  }

  /** PUT request */
  protected put<T>(path: string, body: unknown): Observable<T> {
    return this.http
      .put<XHttpResponse<T>>(`${this.baseUrl}${path}`, body)
      .pipe(map((res) => this.unwrap(res)));
  }

  /** DELETE request */
  protected delete<T>(path: string, params?: Record<string, unknown>): Observable<T> {
    const httpParams = new HttpParams({ fromObject: cleanParams(params ?? {}) });
    return this.http
      .delete<XHttpResponse<T>>(`${this.baseUrl}${path}`, { params: httpParams })
      .pipe(map((res) => this.unwrap(res)));
  }

  /** POST and return raw binary blob (used for reports) */
  protected postBlob(path: string, body: unknown): Observable<Blob> {
    return this.http.post(`${this.baseUrl}${path}`, body, { responseType: 'blob' });
  }

  /** POST multipart/form-data (used for file uploads) */
  protected postFormData<T>(path: string, formData: FormData): Observable<T> {
    return this.http
      .post<XHttpResponse<T>>(`${this.baseUrl}${path}`, formData)
      .pipe(map((res) => this.unwrap(res)));
  }

  private unwrap<T>(res: XHttpResponse<T>): T {
    if (!res.isSuccess) {
      throw new XHttpError(res.statusCode, res.message ?? 'Request failed', res.data);
    }
    return res.data as T;
  }
}
