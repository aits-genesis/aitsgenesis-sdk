# AITS Genesis SDK — Development Plan

> **AI-Agent Context:** This is the ordered development roadmap for all 10 libraries in `aitsgenesis-sdk`.
> Each library section contains its full contract, exported API surface, internal structure, dependencies,
> and acceptance criteria. Implement libraries in the numbered order below to satisfy the dependency graph.
>
> **Backend Reference:** Xalorith `.NET 9` backend — 23 modules, 200+ controllers, 296+ enums.
> See `docs/ARCHITECTURE.md` for response patterns, auth flow, and API contracts.

---

## Implementation Order

```
1. @aits-genesis/models      (no deps)
2. @aits-genesis/utils       (depends on: models)
3. @aits-genesis/auth        (depends on: models, utils)
4. @aits-genesis/http        (depends on: models, auth, utils)
5. @aits-genesis/security    (depends on: models, auth, http)
6. @aits-genesis/org         (depends on: models, auth, http, security)
7. @aits-genesis/forms       (depends on: models, http, utils)
8. @aits-genesis/ui          (depends on: models, http, utils, security, forms)
9. @aits-genesis/reporting   (depends on: models, http, utils, ui)
10. @aits-genesis/core       (already exists — expand as needed)
```

---

## Library 1: `@aits-genesis/models`

**Purpose:** Single source of truth for all TypeScript types mirroring Xalorith backend DTOs and enums.
No Angular dependencies. Pure TypeScript. Zero runtime code — types only (with enums as exceptions).

### Exported API

```typescript
// --- Core Response Types ---
export interface XHttpResponse<T = unknown> {
  id?: string;
  statusCode: number;
  statusName: string;
  isSuccess: boolean;
  message?: string;
  data?: T;
}
export interface BasePaginatedDto<T> {
  totalRecord: number;
  items: T[];
}
export interface BaseSliDto {
  id: string;
  name: string;
  autoGenCode?: string;
  nameWithCode: string;
}
export interface BaseParentSliDto extends BaseSliDto {
  children?: BaseSliDto[];
}

// --- Auth Types ---
export interface LoginVm {
  username: string;
  password: string;
  clientId: string;
  clientSecret: string;
}
export interface TokenResponse {
  token: string;
  expiration: string;
}
export interface JwtClaims {
  userId: string;
  organizationId: string;
  userName: string;
  email: string;
  photoUrl?: string;
  isMultiOrg: boolean;
  userTypeId: number;
}
export interface UserPermissionsDto {
  userPermissions: UserModulePermissionDto[];
  userMenus: MenuDto[];
}
export interface UserModulePermissionDto {
  moduleId: number;
  moduleCode: string;
  actionIds: number[];
}

// --- Wallet ---
export interface BaseWalletDto {
  entityId: string;
  balance: number;
  totalDeposit: number;
  totalWithdrawal: number;
  lastTransactionDate?: string;
}

// --- Audit ---
export interface AuditTrailDto {
  id: string;
  entityName: string;
  action: string;
  userId: string;
  userName: string;
  organizationId: string;
  createdAt: string;
  oldValue?: string;
  newValue?: string;
}

// --- File Bank ---
export interface FileBankDto {
  id: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

// --- Enums (runtime values needed) ---
export enum XHttpStatusCode {
  Added = 100,
  Updated = 101,
  AddOrUpdated = 102,
  Deleted = 103,
  Found = 200,
  Confirmed = 201,
  Approved = 202,
  Rejected = 203,
  Completed = 204,
  Disabled = 205,
  Failed = 500,
  UnAuthorized = 401,
  Forbidden = 403,
  XKeyError = 600,
  XKeyNotFound = 601,
}
export enum ActionEnum {
  View = 1,
  Add = 2,
  Edit = 3,
  Delete = 4,
  Approve = 5,
  Reject = 6,
  Confirm = 7,
  Print = 8,
  Export = 9,
  Import = 10,
}
// All 296+ enums generated from GET /Enum/GenerateEnumToJson and manually typed here
// See docs/libraries/models.md for full enum catalog
```

### Internal File Structure

```
projects/libs/models/src/
├── lib/
│   ├── response/         XHttpResponse, BasePaginatedDto, BaseSliDto
│   ├── auth/             LoginVm, TokenResponse, JwtClaims, UserPermissionsDto
│   ├── wallet/           BaseWalletDto, BaseTransactionDto
│   ├── file/             FileBankDto, FileUploadResult
│   ├── audit/            AuditTrailDto
│   └── enums/
│       ├── http-status.enum.ts
│       ├── action.enum.ts
│       ├── module.enum.ts
│       ├── business-model.enum.ts
│       ├── file-mime-type.enum.ts
│       └── index.ts       (re-exports all enums)
└── index.ts
```

### Acceptance Criteria

- [ ] All types have JSDoc comments
- [ ] `XHttpResponse<T>` is generic and works with `data?: T`
- [ ] Enums have numeric values matching backend `XHttpStatusCode` constants
- [ ] No Angular imports anywhere in this library
- [ ] 100% TypeScript strict mode — no `any`

---

## Library 2: `@aits-genesis/utils`

**Purpose:** Pure utility functions — no Angular, no HTTP. Mirrors Xalorith backend's `XUtility` helper methods
that the frontend also needs (enum lookup, auto-gen code parsing, GUID validation, phone formatting).

### Exported API

```typescript
// GUID
export function isValidGuid(value: string | null | undefined): boolean;
export function emptyGuid(): string; // '00000000-0000-0000-0000-000000000000'

// Strings / AutoGenCode
export function removeAutoGenCode(nameWithCode: string): string; // "Product [P-001]" → "Product"
export function extractAutoGenCode(nameWithCode: string): string; // "Product [P-001]" → "P-001"
export function getNameWithCode(name: string, code?: string): string;

// Enums
export function getEnumDescription<T extends object>(enumObj: T, value: number): string;
export function getEnumEntries<T extends object>(
  enumObj: T,
): Array<{ value: number; label: string }>;

// Date
export function toApiDate(date: Date | string): string; // → "YYYY-MM-DD"
export function toApiDateTime(date: Date | string): string; // → ISO 8601
export function fromApiDate(dateStr: string): Date;
export function formatDisplayDate(dateStr: string, locale?: string): string;

// Numbers / Currency
export function formatAmount(amount: number, currency?: string, locale?: string): string;
export function roundAmount(amount: number, decimals?: number): number;

// Phone
export function formatBdPhone(phone: string): string; // → +880XXXXXXXXXX
export function isValidBdPhone(phone: string): boolean;

// File
export function getMimeTypeLabel(mimeType: string): string;
export function formatFileSize(bytes: number): string;

// Barcode / QR (thin wrappers — actual libs are peer deps)
export function generateQrDataUrl(text: string): Promise<string>;
```

### Acceptance Criteria

- [ ] No Angular or HTTP dependencies
- [ ] All functions are pure (no side effects)
- [ ] 100% unit test coverage
- [ ] Tree-shakeable (no barrel objects, named exports only)

---

## Library 3: `@aits-genesis/auth`

**Purpose:** JWT authentication for Xalorith API. Token lifecycle, user state, interceptor, guards.
Uses Angular Signals for reactive state. No NgRx dependency.

### Exported API

```typescript
// Provider (call in app.config.ts)
export function provideXalorithAuth(config: AuthConfig): EnvironmentProviders

export interface AuthConfig {
  apiBaseUrl: string;
  clientId: string;         // 'web-app' or 'mob-app'
  clientSecret: string;
  tokenStorageKey?: string; // default: 'xalorith_token'
}

// Service
export class AuthService {
  // Signals (read-only)
  readonly isAuthenticated: Signal<boolean>
  readonly currentUser: Signal<JwtClaims | null>
  readonly currentOrgId: Signal<string | null>
  readonly isMultiOrg: Signal<boolean>
  readonly token: Signal<string | null>

  // Methods
  login(credentials: LoginVm): Observable<TokenResponse>
  logout(allDevices?: boolean): Observable<void>
  switchOrganization(orgId: string): Observable<void>   // re-issues token with new orgId
  refreshUserPermissions(): Observable<UserPermissionsDto>
  getOrganizations(): Observable<BaseSliDto[]>
  isTokenExpired(): boolean
}

// Interceptor (auto-applied by provideXalorithAuth)
export class AuthInterceptor implements HttpInterceptor

// Guards
export function authGuard(): CanActivateFn
export function orgSelectedGuard(): CanActivateFn   // redirects if no orgId in token

// Tokens
export const AUTH_CONFIG = new InjectionToken<AuthConfig>('AUTH_CONFIG')
```

### Internal File Structure

```
projects/libs/auth/src/lib/
├── auth.config.ts
├── auth.service.ts
├── auth.interceptor.ts
├── auth.guard.ts
├── org-selected.guard.ts
├── jwt.utils.ts          (parse JWT payload without library dependency)
└── provide-auth.ts
```

### Acceptance Criteria

- [ ] `provideXalorithAuth()` is the only setup needed in `app.config.ts`
- [ ] Token stored in `localStorage` by default; configurable
- [ ] `AuthService.currentUser` is a computed signal derived from token
- [ ] `switchOrganization()` refreshes token with new `OrganizationId` claim
- [ ] Interceptor attaches `Authorization: Bearer <token>` to all requests to `apiBaseUrl`
- [ ] `authGuard` redirects to `/auth/login` if not authenticated
- [ ] `orgSelectedGuard` redirects to `/auth/select-org` if `isMultiOrg && !orgId`
- [ ] Unit tests for JWT parsing, guard redirects, interceptor header injection

---

## Library 4: `@aits-genesis/http`

**Purpose:** Base HTTP service pattern, typed response handling, file operations, pagination, loading state.

### Exported API

```typescript
// Provider
export function provideXalorithHttp(config: HttpConfig): EnvironmentProviders

export interface HttpConfig {
  apiBaseUrl: string;
  showGlobalLoader?: boolean;      // default: true
  showGlobalErrorToast?: boolean;  // default: true
}

// Base service — extend per feature
export abstract class BaseApiService<TDto, TSliDto extends BaseSliDto, TCreateVm, TUpdateVm> {
  protected abstract readonly endpoint: string

  getById(id: string): Observable<XHttpResponse<TDto>>
  getAll(query?: PaginationQuery): Observable<XHttpResponse<BasePaginatedDto<TDto>>>
  getSliList(): Observable<XHttpResponse<TSliDto[]>>
  create(vm: TCreateVm): Observable<XHttpResponse<void>>
  update(id: string, vm: TUpdateVm): Observable<XHttpResponse<void>>
  delete(id: string): Observable<XHttpResponse<void>>
}

// Pagination
export interface PaginationQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  [key: string]: unknown;    // extra filters
}

// File operations
export class FileBankService {
  upload(file: File, orgId: string): Observable<XHttpResponse<FileBankDto>>
  download(fileBankId: string): Observable<Blob>
  getUrl(fileBankId: string): string
}

// Global loader
export class HttpLoadingService {
  readonly isLoading: Signal<boolean>
}

// Interceptor (auto-applied by provideXalorithHttp)
// - Sets loading state
// - Catches errors and emits to global error bus
export class XHttpInterceptor implements HttpInterceptor

// Error bus
export class XHttpErrorBus {
  readonly errors$: Observable<XHttpErrorEvent>
}
export interface XHttpErrorEvent { statusCode: number; message: string; endpoint: string; }
```

### Acceptance Criteria

- [ ] `BaseApiService` works with any `TDto`, `TSliDto`, `TCreateVm`, `TUpdateVm`
- [ ] `isLoading` signal increments/decrements per concurrent request
- [ ] `XHttpInterceptor` maps `isSuccess: false` to thrown `XHttpErrorEvent`
- [ ] `FileBankService.upload()` uses `multipart/form-data`
- [ ] Tests for each method of `BaseApiService` using `HttpClientTestingModule`

---

## Library 5: `@aits-genesis/security`

**Purpose:** Frontend mirror of the backend permission system. Loads, caches, and checks module/action permissions.

### Exported API

```typescript
// Provider
export function provideXalorithSecurity(): EnvironmentProviders;

// Service
export class PermissionService {
  readonly permissions: Signal<UserPermissionsDto | null>;

  load(): Observable<UserPermissionsDto>; // call after login
  hasPermission(module: ModuleEnum, action: ActionEnum): boolean;
  hasAnyPermission(module: ModuleEnum, actions: ActionEnum[]): boolean;
  clear(): void; // call on logout
}

// Structural directive
@Directive({ selector: '[agIfHasPermission]' })
export class IfHasPermissionDirective {
  @Input() agIfHasPermission: string; // 'ModuleName.ActionName' or [ModuleEnum, ActionEnum]
}

// Attribute directive (disables element instead of removing)
@Directive({ selector: '[agDisableIfNoPermission]' })
export class DisableIfNoPermissionDirective {}

// Pipe
@Pipe({ name: 'hasPermission' })
export class HasPermissionPipe implements PipeTransform {
  transform(module: ModuleEnum, action: ActionEnum): boolean;
}

// Route guard
export function permissionGuard(module: ModuleEnum, action: ActionEnum): CanActivateFn;

// Enums (re-exported from models for convenience)
export { ModuleEnum, ActionEnum } from '@aits-genesis/models';
```

### Acceptance Criteria

- [ ] `IfHasPermissionDirective` works like `*ngIf` — removes/adds from DOM
- [ ] `PermissionService` caches in memory; `load()` is idempotent
- [ ] `permissionGuard` redirects to `403` route if not permitted
- [ ] Tests for all directive cases (has / does not have permission)

---

## Library 6: `@aits-genesis/org`

**Purpose:** Multi-tenant organization context. Current org tracking, org switching, business center context.

### Exported API

```typescript
// Provider
export function provideXalorithOrg(): EnvironmentProviders

// Org context service
export class OrgContextService {
  readonly currentOrg: Signal<OrganizationDto | null>
  readonly currentBusinessCenter: Signal<BusinessCenterDto | null>
  readonly organizations: Signal<OrganizationSliDto[]>

  loadOrganizations(): Observable<OrganizationSliDto[]>
  selectOrganization(orgId: string): Observable<void>
  selectBusinessCenter(bcId: string): void
}

// Components
@Component({ selector: 'ag-org-selector' })
export class OrgSelectorComponent {}          // full-screen org picker shown after login

@Component({ selector: 'ag-org-switcher' })
export class OrgSwitcherComponent {}          // compact header dropdown

// Interceptor — adds X-Organization-Id header (if API requires it separately from JWT)
export class OrgInterceptor implements HttpInterceptor

// Guard
export function orgContextGuard(): CanActivateFn  // ensures org is loaded before feature routes
```

### Acceptance Criteria

- [ ] `OrgSelectorComponent` is shown when `isMultiOrg=true && !orgId`
- [ ] Switching org refreshes token and reloads permissions
- [ ] Business center selection persists in `sessionStorage`

---

## Library 7: `@aits-genesis/forms`

**Purpose:** Typed reactive form abstractions, validators, and shared form control components.

### Exported API

```typescript
// Abstract base (extend in feature components)
export abstract class BaseFormComponent<TVm> implements OnInit {
  abstract buildForm(): FormGroup;
  abstract onSubmit(vm: TVm): Observable<XHttpResponse>;

  protected form: FormGroup;
  protected isSubmitting: Signal<boolean>;
  protected submitError: Signal<string | null>;

  protected handleSubmit(): void; // calls onSubmit, handles loading/error
  protected resetForm(): void;
  protected markAllTouched(): void;
}

// Validators
export const XValidators = {
  guid: ValidatorFn,
  bdPhone: ValidatorFn,
  positiveAmount: ValidatorFn,
  dateRange: (start: AbstractControl, end: AbstractControl) => ValidatorFn,
  requiredIf: (condition: () => boolean) => ValidatorFn,
  minDate: (min: Date) => ValidatorFn,
  maxDate: (max: Date) => ValidatorFn,
};

// Components
@Component({ selector: 'ag-sli-select' })
export class SliSelectComponent {
  @Input() label: string;
  @Input() sliLoader: () => Observable<BaseSliDto[]>; // lazy loaded
  @Input() formControlName: string;
  @Input() multiple: boolean;
}

@Component({ selector: 'ag-field-error' })
export class FieldErrorComponent {
  @Input() control: AbstractControl;
}

@Component({ selector: 'ag-form-actions' })
export class FormActionsComponent {
  @Input() isSubmitting: Signal<boolean>;
  @Input() submitLabel: string;
  @Output() cancel: EventEmitter<void>;
}

// Guard
export function dirtyFormGuard(): CanDeactivateFn<{ isDirty: () => boolean }>;
```

### Acceptance Criteria

- [ ] `BaseFormComponent` handles loading state, error display, and reset automatically
- [ ] `SliSelectComponent` uses virtual scrolling for large lists
- [ ] `XValidators` integrate with Angular reactive forms `ValidationErrors`
- [ ] `dirtyFormGuard` shows confirmation dialog before navigation away from unsaved form

---

## Library 8: `@aits-genesis/ui`

**Purpose:** Shared UI component library. Design-system-agnostic base components tied to Xalorith UX patterns.
Uses Angular CDK for overlay/portal. Supports theming via CSS custom properties.

### Component Catalog

```
ag-table              Server-side paginated data table (BasePaginatedDto)
ag-modal              CRUD modal with configurable title, actions, size
ag-confirm-dialog     "Are you sure?" dialog
ag-toast              Toast notifications mapped from XHttpStatusCodeEnum
ag-page-header        Page title + breadcrumb + action buttons slot
ag-file-upload        FileBank-aware upload (drag-drop + progress)
ag-status-badge       Renders XHttpStatusCode enum name as colored badge
ag-wallet-summary     Balance/deposit/withdrawal display card
ag-audit-trail        Audit history timeline component
ag-skeleton           Loading placeholder (table, card, list variants)
ag-spinner            Full-page or inline loading spinner
ag-empty-state        Empty list illustration + action button
ag-search-bar         Debounced search input with clear button
ag-date-range-picker  From/To date range control
ag-amount-display     Formatted currency display with symbol
```

### `ag-table` Contract

```typescript
@Component({ selector: 'ag-table' })
export class XTableComponent<T> {
  @Input() columns: TableColumn<T>[];
  @Input() data: Signal<BasePaginatedDto<T> | null>;
  @Input() isLoading: Signal<boolean>;
  @Input() pageSize: number;
  @Output() pageChange: EventEmitter<PaginationQuery>;
  @Output() rowAction: EventEmitter<{ action: string; row: T }>;
}

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  type?: 'text' | 'date' | 'amount' | 'badge' | 'action' | 'template';
  permission?: { module: ModuleEnum; action: ActionEnum }; // hide column if no permission
  sortable?: boolean;
  template?: TemplateRef<{ $implicit: T }>;
}
```

### `ag-toast` Contract

```typescript
export class ToastService {
  success(response: XHttpResponse): void; // maps isSuccess=true
  error(response: XHttpResponse): void; // maps isSuccess=false
  info(message: string): void;
  warn(message: string): void;
}
```

### Theming

All components use CSS custom properties:

```css
--ag-primary: #your-color;
--ag-surface: #ffffff;
--ag-border-radius: 8px;
--ag-font-family: 'Inter', sans-serif;
```

### Acceptance Criteria

- [ ] All components are standalone
- [ ] `ag-table` works with any `T extends object`
- [ ] `ag-file-upload` integrates with `FileBankService` from `@aits-genesis/http`
- [ ] `ToastService` auto-dismisses after 4s, stackable
- [ ] Theme tokens documented in component stories or README

---

## Library 9: `@aits-genesis/reporting`

**Purpose:** Report generation, PDF viewing, and Excel export for Xalorith report endpoints.

### Exported API

```typescript
// Provider
export function provideXalorithReporting(): EnvironmentProviders;

// Service
export class ReportService {
  downloadPdf(endpoint: string, params: object): Observable<void>; // triggers browser download
  openPdf(endpoint: string, params: object): Observable<Blob>; // for viewer
  downloadExcel(endpoint: string, params: object): Observable<void>;
}

// Client-side Excel export (for simple list data — no server needed)
export class ExcelExportService {
  export<T>(data: T[], columns: ExcelColumn<T>[], filename: string): void;
}

export interface ExcelColumn<T> {
  key: keyof T;
  header: string;
  width?: number;
  format?: 'text' | 'number' | 'currency' | 'date';
}

// Components
@Component({ selector: 'ag-report-button' })
export class ReportButtonComponent {
  @Input() label: string;
  @Input() endpoint: string;
  @Input() params: Signal<object>;
  @Input() type: 'pdf' | 'excel';
}

@Component({ selector: 'ag-pdf-viewer' })
export class PdfViewerComponent {
  @Input() blob: Signal<Blob | null>;
}

@Component({ selector: 'ag-print-button' })
export class PrintButtonComponent {} // triggers window.print() on marked zone
```

### Acceptance Criteria

- [ ] PDF download triggers `<a download>` pattern — no popup blockers
- [ ] `ExcelExportService` works entirely client-side (no server) using `xlsx` or `exceljs` peer dep
- [ ] `ag-pdf-viewer` uses lazy-loaded `pdfjs-dist` (not bundled by default)

---

## Library 10: `@aits-genesis/core` (expand existing)

**Current state:** Has `AITS_GENESIS_VERSION` and `ANGULAR_VERSION` injection tokens.

**Planned additions:**

```typescript
// Environment provider helpers
export function provideApiBaseUrl(url: string): EnvironmentProviders;
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
export const XALORITH_CONFIG = new InjectionToken<XalorithConfig>('XALORITH_CONFIG');

export interface XalorithConfig {
  apiBaseUrl: string;
  clientId: string;
  clientSecret: string;
  defaultLanguage?: string; // 'en' | 'bn' | 'ar'
  defaultTheme?: string; // 'light' | 'dark'
}

// Master provider — sets up all SDK providers in one call
export function provideXalorithSdk(config: XalorithConfig): EnvironmentProviders;

// Lifecycle hook types
export interface OnOrgChange {
  onOrganizationChanged(orgId: string): void;
}
export interface OnPermissionsLoad {
  onPermissionsLoaded(permissions: UserPermissionsDto): void;
}
```

### Acceptance Criteria

- [ ] `provideXalorithSdk()` calls all individual `provideX()` functions with correct config
- [ ] `XALORITH_CONFIG` token available anywhere via `inject(XALORITH_CONFIG)`

---

## Testing Requirements (All Libraries)

- Each library must have tests in `projects/libs/<name>/src/lib/**/*.spec.ts`
- Run with `npm run test` (Jest)
- Minimum coverage: 80% for new code
- Test files: `*.service.spec.ts`, `*.component.spec.ts`, `*.directive.spec.ts`, `*.pipe.spec.ts`

## CI Requirements

All three jobs must pass before merge:

1. **Lint** — `npm run lint` (eslint flat config)
2. **Test** — `npm run test` (jest)
3. **Build Libraries** — `npm run build:all` (ng build all libs)
