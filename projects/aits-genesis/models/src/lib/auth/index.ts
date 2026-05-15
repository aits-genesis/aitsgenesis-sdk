/**
 * Login request payload for `POST /connect/token`.
 * Backend uses `OpenIdConnectRequest` which deserialises snake_case JSON keys.
 */
export interface LoginVm {
  /** Maps to OpenIdConnectRequest.Username */
  username: string;
  /** Maps to OpenIdConnectRequest.Password */
  password: string;
  /** Maps to OpenIdConnectRequest.GrantType — always "password" */
  grant_type: 'password';
  /** Maps to OpenIdConnectRequest.ClientId — e.g. "XALORITH_WA" */
  client_id: string;
  /** Maps to OpenIdConnectRequest.ClientSecret */
  client_secret: string;
}

/**
 * Raw token response from `POST /connect/token`.
 * Backend returns `{ token, expiration }` — NOT the standard OAuth2 shape.
 */
export interface TokenResponse {
  /** The signed JWT string */
  token: string;
  /** ISO-8601 expiry datetime string */
  expiration: string;
}

/**
 * Decoded JWT payload claims produced by the Xalorith identity server.
 * Claim type strings match {@link XalorithClaimTypes} constants in the backend.
 */
export interface JwtClaims {
  /** Standard JWT subject (maps to user ID) */
  sub: string;
  /** Xalorith internal user GUID */
  userId: string;
  /** User's login name */
  userName: string;
  /** User's email address */
  email: string;
  /** Optional avatar/photo URL */
  photoUrl?: string;
  /**
   * Whether the user belongs to multiple organisations.
   * The backend stores this as the string literal `"true"` or `"false"` — NOT a boolean.
   * Use `isMultiOrg === 'true'` for comparison.
   */
  isMultiOrg: string;
  /** Numeric user type identifier */
  userTypeId: number;
  /** Active organisation GUID (only present when user has exactly one org or a default is set) */
  organizationId?: string;
  /** Active organisation display name */
  organizationName?: string;
  /** JWT unique ID (jti claim) */
  jti?: string;
  /** Expiry as Unix epoch seconds */
  exp: number;
  /** Issued-at as Unix epoch seconds */
  iat: number;
}

/** Response from `GET /Authorization/GetUserPermission` */
export interface UserPermissionsDto {
  userPermissions: UserModulePermissionDto[];
  userMenus: MenuDto[];
}

export interface UserModulePermissionDto {
  moduleId: number;
  moduleCode?: string;
  actionIds: number[];
}

export interface MenuDto {
  moduleId: number;
  menuPath: string;
  parentId?: number;
  icon?: string;
  displayName?: string;
  sortOrder?: number;
}

/** Runtime auth state kept in {@link AuthStore} */
export interface AuthState {
  accessToken: string | null;
  claims: JwtClaims | null;
  /** Active organisation ID (set after org selection for multi-org users) */
  activeOrgId: string | null;
  isAuthenticated: boolean;
}
