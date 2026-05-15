import { XHttpStatusCode } from '@aits-genesis/models';

/** Runtime error thrown when the API returns `isSuccess: false` */
export class XHttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly data?: unknown,
  ) {
    super(message);
    this.name = 'XHttpError';
  }

  get isUnauthorized(): boolean {
    return this.statusCode === XHttpStatusCode.UnAuthorized;
  }
  get isForbidden(): boolean {
    return this.statusCode === XHttpStatusCode.Forbidden;
  }
  get isNotFound(): boolean {
    return this.statusCode === XHttpStatusCode.XKeyNotFound;
  }
}
