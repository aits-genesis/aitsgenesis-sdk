/** Standard envelope for all Xalorith API responses. */
export interface XHttpResponse<T = unknown> {
  id?: string;
  /** Numeric status code — see {@link XHttpStatusCode} */
  statusCode: number;
  statusName: string;
  /** `false` when `statusCode === XHttpStatusCode.Failed` */
  isSuccess: boolean;
  /** User-facing error message when `isSuccess` is false */
  message?: string;
  data?: T;
}

/** All list endpoints return this envelope inside {@link XHttpResponse.data} */
export interface BasePaginatedDto<T> {
  totalRecord: number;
  items: T[];
}

/** Pagination query parameters for list endpoints */
export interface PaginationQuery {
  /** 1-based page number */
  pageNo: number;
  pageSize: number;
  searchText?: string;
}

/** Slim list item — used for all dropdowns / select fields */
export interface BaseSliDto {
  id: string;
  name: string;
  autoGenCode?: string;
  /** `"{name} [{autoGenCode}]"` — preferred display value */
  nameWithCode: string;
}

/** Slim list item with optional parent and children hierarchy */
export interface BaseParentSliDto extends BaseSliDto {
  parentId?: string;
  children?: BaseParentSliDto[];
}

/** Slim item with type */
export interface BaseWithTypeSliDto extends BaseSliDto {
  typeId: number;
}

/** Slim item with type + category */
export interface BaseWithTypeNCategorySliDto extends BaseWithTypeSliDto {
  categoryId?: string;
}
