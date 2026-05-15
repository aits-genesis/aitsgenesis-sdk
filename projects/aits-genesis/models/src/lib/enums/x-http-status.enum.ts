/**
 * Custom HTTP status codes used by Xalorith API inside {@link XHttpResponse.statusCode}.
 * These are NOT standard HTTP status codes.
 */
export enum XHttpStatusCode {
  /** Entity was successfully added */
  Added = 100,
  /** Entity was successfully updated */
  Updated = 101,
  /** Entity was added or updated */
  AddOrUpdated = 102,
  /** Entity was successfully deleted */
  Deleted = 103,
  /** Entity was found / retrieved */
  Found = 200,
  /** Action was confirmed */
  Confirmed = 201,
  /** Action was approved */
  Approved = 202,
  /** Action was rejected */
  Rejected = 203,
  /** Operation was completed */
  Completed = 204,
  /** Entity was disabled */
  Disabled = 205,
  /** Operation failed (maps to `isSuccess: false`) */
  Failed = 500,
  /** Unauthorized access */
  UnAuthorized = 401,
  /** Access is forbidden */
  Forbidden = 403,
  /** Invalid x-key header */
  XKeyError = 600,
  /** x-key not found */
  XKeyNotFound = 601,
}
