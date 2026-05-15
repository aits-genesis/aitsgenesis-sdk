# AITS Genesis SDK — Architecture

> **AI-Agent Context:** This document describes the complete architectural blueprint of the `aitsgenesis-sdk`
> Angular library monorepo. Read this before generating any library code or modifying library structure.

## Overview

`aitsgenesis-sdk` is an Angular 21 library monorepo (Nx-free, Angular workspace) that provides a suite of
reusable, publishable npm packages under the `@aits-genesis` scope. The SDK is the **client-side foundation**
for all frontend applications built against the **Xalorith** `.NET 9` backend platform.

All packages are published to **GitHub Packages** at `https://npm.pkg.github.com/@aits-genesis`.

---

## Monorepo Layout

```
aitsgenesis-sdk/
├── projects/
│   └── libs/
│       ├── core/            @aits-genesis/core        ✅ exists
│       ├── models/          @aits-genesis/models       🔲 planned
│       ├── auth/            @aits-genesis/auth         🔲 planned
│       ├── http/            @aits-genesis/http         🔲 planned
│       ├── security/        @aits-genesis/security     🔲 planned
│       ├── forms/           @aits-genesis/forms        🔲 planned
│       ├── ui/              @aits-genesis/ui           🔲 planned
│       ├── org/             @aits-genesis/org          🔲 planned
│       ├── reporting/       @aits-genesis/reporting    🔲 planned
│       └── utils/           @aits-genesis/utils        🔲 planned
├── .github/
│   └── workflows/
│       ├── ci.yml           Lint + Test + Build (required checks)
│       └── release.yml      semantic-release → tag → build → publish
├── docs/
│   ├── ARCHITECTURE.md      ← this file
│   ├── DEVELOPMENT_PLAN.md  Ordered build plan for all libraries
│   └── libraries/           Per-library contract docs
├── .releaserc.json          semantic-release config (main/next/beta channels)
├── .eslintrc / eslint.config.js
├── prettier.config.js
├── jest.config.js
├── commitlint.config.js
└── angular.json
```

---

## Library Dependency Graph

```
┌─────────────────────────────────────────────────────────────────┐
│                    Consumer Applications                         │
│              (xalorith-web, mobile apps, portals)               │
└────────────┬────────────────────────────────┬────────────────────┘
             │                                │
    ┌────────┴────────┐              ┌─────────┴──────────┐
    │  @a-g/ui        │              │  @a-g/reporting    │
    │  @a-g/forms     │              │  @a-g/messaging    │
    └────────┬────────┘              └─────────┬──────────┘
             │                                │
    ┌────────┴────────┐              ┌─────────┴──────────┐
    │  @a-g/security  │              │  @a-g/org          │
    └────────┬────────┘              └─────────┬──────────┘
             │                                │
    ┌────────┴────────────────────────────────┴──────────┐
    │                    @a-g/http                        │
    └────────────────────────────┬────────────────────────┘
                                 │
    ┌────────────────────────────┼────────────────────────┐
    │               @a-g/auth    │    @a-g/utils           │
    └────────────────────────────┼────────────────────────┘
                                 │
    ┌────────────────────────────┴────────────────────────┐
    │                    @a-g/models                       │
    └────────────────────────────┬────────────────────────┘
                                 │
    ┌────────────────────────────┴────────────────────────┐
    │                    @a-g/core                         │
    └─────────────────────────────────────────────────────┘
```

**Rule:** Libraries only import from libraries below them in this graph. No circular dependencies.

---

## Backend Contract Reference

The SDK wraps the **Xalorith** `.NET 9` REST API. Key patterns:

### API Response Wrapper — `XHttpResponse`

Every API response is wrapped in:

```typescript
interface XHttpResponse<T = unknown> {
  id?: string; // GUID of created/updated entity
  statusCode: number; // XHttpStatusCodeEnum value
  statusName: string; // Human-readable status
  isSuccess: boolean; // true unless statusCode == Failed
  message?: string; // User-facing message
  data?: T; // Payload
}
```

### Pagination — `BasePaginatedDto<T>`

```typescript
interface BasePaginatedDto<T> {
  totalRecord: number;
  items: T[];
}
```

### Select List Item — `BaseSliDto`

Used for all dropdowns/selects:

```typescript
interface BaseSliDto {
  id: string; // GUID
  name: string;
  autoGenCode?: string;
  nameWithCode: string; // "{name} [{autoGenCode}]"
}
```

### Authentication

- Endpoint: `POST /connect/token` (OpenIdConnect password grant)
- Token: JWT with 1-day expiry
- Claims: `userId`, `organizationId`, `userName`, `email`, `photoUrl`, `isMultiOrg`, `userTypeId`
- Multi-org: If `isMultiOrg=true`, user selects org before accessing data

### Permission System

- Endpoint: `GET /Authorization/GetUserPermission`
- Returns: `{ userPermissions: [{moduleId, actionId}], userMenus: [...] }`
- Backend guard: `[HasPermission(ModuleEnum, ActionEnum)]`

### Enums

- Endpoint: `GET /Enum/GenerateEnumToJson`
- Returns all 296+ backend enums serialized to JSON — load on app init and cache.

### File Upload

- All files go through the **FileBank** controller
- Upload → receive `fileBankId` → attach GUID to entity

### Reports

- Report endpoints return binary PDF
- Parameterized via `POST` with `reportDto`
- Client downloads blob as PDF or Excel

---

## Angular Version & Toolchain

| Tool             | Version                              |
| ---------------- | ------------------------------------ |
| Angular          | 21.x                                 |
| TypeScript       | 5.7+                                 |
| RxJS             | 7.x                                  |
| Angular Signals  | built-in                             |
| ESLint           | flat config (eslint.config.js)       |
| Prettier         | 3.x                                  |
| Jest             | 29.x + jest-preset-angular 16        |
| Husky            | 9.x                                  |
| commitlint       | Conventional Commits                 |
| semantic-release | auto-release on `main`/`next`/`beta` |

---

## Coding Standards for AI Agents

1. **Standalone components only** — no NgModules.
2. **Signal-based state** — use `signal()`, `computed()`, `effect()`. Avoid BehaviorSubjects where signals suffice.
3. **Inject function** — use `inject()` in component bodies, not constructor injection.
4. **Typed HTTP** — always specify generics: `http.get<XHttpResponse<MyDto[]>>()`.
5. **`provideX()` functions** — every library exposes a `provideXXX()` function for bootstrapping. No `forRoot()`.
6. **Tree-shakeable** — `providedIn: 'root'` for services; no barrel re-exports of components unless needed.
7. **No `any`** — strict TypeScript. All API response shapes typed via `@aits-genesis/models`.
8. **GUID helpers** — use `@aits-genesis/utils` `isValidGuid()` — never raw UUID strings.
9. **Testing** — every public function/component has a Jest unit test. Use `TestBed.configureTestingModule` with `provideHttpClientTesting`.
10. **Exports** — each library has one `index.ts` (public API). Only export what consumers need.

---

## Release Process

1. Push to `next` branch → pre-release published (e.g., `1.0.0-next.1`)
2. Merge `next` → `main` via PR → stable release published (e.g., `1.0.0`)
3. All libraries share the same version (monorepo versioning)
4. `release.yml` reads root `package.json` version and writes to all `projects/libs/*/package.json` before building

---

## Adding a New Library

```bash
# 1. Generate the library
ng generate library @aits-genesis/my-lib \
  --project-root=projects/libs/my-lib \
  --prefix=ag

# 2. Add publishConfig to projects/libs/my-lib/package.json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com",
    "access": "public"
  }
}

# 3. Add to angular.json build targets
# 4. Add to build:all script in root package.json
# 5. Add tests, eslint.config.js, tsconfig references
# 6. Add docs/libraries/my-lib.md
```
