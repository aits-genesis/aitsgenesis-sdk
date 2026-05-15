/** Login request payload for `POST /connect/token` */
export interface LoginVm {
  username: string;
  password: string;
  clientId: string;
  clientSecret: string;
}

/** Raw JWT token response from the identity server */
export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/** Decoded JWT claims from Xalorith identity server */
export interface JwtClaims {
  sub: string;
  userId: string;
  organizationId?: string;
  userName: string;
  email: string;
  photoUrl?: string;
  /** If true the user belongs to multiple orgs and must select one */
  isMultiOrg: boolean;
  userTypeId: number;
  exp: number;
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
  /** Active organization ID (set after org selection for multi-org users) */
  activeOrgId: string | null;
  isAuthenticated: boolean;
}
