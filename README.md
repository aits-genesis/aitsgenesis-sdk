<h1 align="center">AITS Genesis SDK</h1>

<p align="center">
  <strong>Angular 21 library monorepo · Client-side SDK for the <a href="https://github.com/aits-genesis">Xalorith</a> ERP platform</strong><br/>
  10 composable packages published as <code>@aits-genesis/*</code> on GitHub Packages
</p>

<p align="center">
  <a href="https://github.com/aits-genesis/aitsgenesis-sdk/actions/workflows/ci.yml">
    <img src="https://github.com/aits-genesis/aitsgenesis-sdk/actions/workflows/ci.yml/badge.svg" alt="CI" />
  </a>
  <a href="https://github.com/aits-genesis/aitsgenesis-sdk/releases">
    <img src="https://img.shields.io/github/v/release/aits-genesis/aitsgenesis-sdk?logo=github" alt="Latest Release" />
  </a>
  <a href="https://github.com/aits-genesis/aitsgenesis-sdk/pkgs/npm">
    <img src="https://img.shields.io/badge/registry-GitHub%20Packages-blue?logo=github" alt="GitHub Packages" />
  </a>
  <img src="https://img.shields.io/badge/Angular-21-red?logo=angular" alt="Angular 21" />
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/aits-genesis/aitsgenesis-sdk" alt="MIT License" />
  </a>
</p>

> **AI-Agent Note:** This SDK is the Angular client foundation for the **Xalorith** `.NET 9` ERP backend.
> Before coding anything, read [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for API contracts and coding standards,
> and [`docs/DEVELOPMENT_PLAN.md`](docs/DEVELOPMENT_PLAN.md) for the full library build plan.

---

## Overview

`aitsgenesis-sdk` is a **monorepo Angular workspace** hosting 10 shared Angular libraries for the
[Xalorith ERP](https://github.com/aits-genesis/xalorith-web) platform. All libraries are built and released
together under the `@aits-genesis/*` npm scope on [GitHub Packages](https://github.com/aits-genesis/aitsgenesis-sdk/pkgs/npm).

Each library is generated with `ng generate library`, lives in `projects/libs/<name>/`, and follows a strict
dependency graph to ensure tree-shakeability and clean separation of concerns.

Each library is generated with `ng generate library` and lives in `projects/libs/<name>/`.

---

## Repository Structure

```
aitsgenesis-sdk/
├── projects/
│   └── libs/                  # One directory per library
│       └── <lib-name>/
│           ├── src/
│           │   ├── lib/        # Components, services, directives, pipes
│           │   └── public-api.ts
│           ├── ng-package.json
│           └── package.json   # name: @aits-genesis/<lib-name>
├── dist/                      # Build output — published to GitHub Packages
├── .github/
│   ├── CODEOWNERS
│   ├── ISSUE_TEMPLATE/        # Bug / feature / new-library templates
│   ├── PULL_REQUEST_TEMPLATE/
│   └── workflows/
│       ├── ci.yml             # Lint + test + build on every push / PR
│       └── release.yml        # semantic-release on main → publish to GitHub Packages
├── eslint.config.js           # ESLint with angular-eslint
├── jest.config.js             # Jest with jest-preset-angular
├── commitlint.config.js       # Conventional Commits enforcement
├── .prettierrc                # Prettier formatting config
├── .npmrc                     # Scopes @aits-genesis to GitHub Packages registry
├── .releaserc.json            # semantic-release configuration
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── LICENSE                    # MIT
```

---

## Libraries

> **Build order:** `models` → `utils` → `auth` → `http` → `security` → `org` → `forms` → `ui` → `reporting`
> See [`docs/DEVELOPMENT_PLAN.md`](docs/DEVELOPMENT_PLAN.md) for full contracts, exported APIs, and acceptance criteria.

| Package                                                  | Status       | Purpose                                                               |
| -------------------------------------------------------- | ------------ | --------------------------------------------------------------------- |
| [`@aits-genesis/core`](projects/libs/core)               | ✅ Published | Foundation: version tokens, `provideXalorithSdk()`, `XALORITH_CONFIG` |
| [`@aits-genesis/models`](docs/libraries/models.md)       | 🔲 Planned   | All TypeScript interfaces + enums mirroring Xalorith backend DTOs     |
| [`@aits-genesis/utils`](docs/libraries/utils.md)         | 🔲 Planned   | Pure utilities: date, amount, phone, GUID, enum helpers               |
| [`@aits-genesis/auth`](docs/libraries/auth.md)           | 🔲 Planned   | JWT auth, `AuthService` (signals), interceptor, guards                |
| [`@aits-genesis/http`](docs/libraries/http.md)           | 🔲 Planned   | `BaseApiService`, `FileBankService`, loading state, error bus         |
| [`@aits-genesis/security`](docs/libraries/security.md)   | 🔲 Planned   | Permission service, `*agIfHasPermission` directive, route guard       |
| [`@aits-genesis/org`](docs/libraries/org.md)             | 🔲 Planned   | Multi-org context, org selector, business center context              |
| [`@aits-genesis/forms`](docs/libraries/forms.md)         | 🔲 Planned   | `BaseFormComponent`, `XValidators`, `SliSelectComponent`              |
| [`@aits-genesis/ui`](docs/libraries/ui.md)               | 🔲 Planned   | `ag-table`, `ag-modal`, `ag-toast`, `ag-file-upload`, 15+ components  |
| [`@aits-genesis/reporting`](docs/libraries/reporting.md) | 🔲 Planned   | PDF download, Excel export, `ag-pdf-viewer`, `ag-report-button`       |

---

## Backend Integration

This SDK is purpose-built for the **Xalorith** `.NET 9` ERP backend:

- 23 business modules (Auth, CRM, Accounting, Finance, Sales, Inventory, HR, Marketing, ELearn, MSM, …)
- All API responses wrapped in `XHttpResponse<T>` — handled by `@aits-genesis/http`
- Module-level permission guard `[HasPermission(Module, Action)]` — mirrored by `@aits-genesis/security`
- 296+ backend enums served via `/Enum/GenerateEnumToJson` — typed in `@aits-genesis/models`
- Multi-tenant (OrganizationId-scoped) — managed by `@aits-genesis/org`

---

## Getting Started

### Prerequisites

- Node 22 LTS
- npm 10+

### Install

```bash
git clone git@github.com:aits-genesis/aitsgenesis-sdk.git
cd aitsgenesis-sdk
npm install          # installs deps + initialises Husky git hooks
```

### Verify setup

```bash
npm run lint          # ESLint across projects/
npm run format:check  # Prettier formatting check
npm test              # Jest unit tests
npm run build:all     # Build all libraries
```

---

## Installing Packages (as a consumer)

Libraries are published to **GitHub Packages** — not the public npm registry.

### 1. Configure your registry

Add to your project's `.npmrc`:

```ini
@aits-genesis:registry=https://npm.pkg.github.com
```

### 2. Authenticate

Create a [GitHub Personal Access Token](https://github.com/settings/tokens/new) with the `read:packages` scope, then either:

```bash
# Option A — environment variable
export NODE_AUTH_TOKEN=ghp_your_token_here

# Option B — npm login
npm login --registry=https://npm.pkg.github.com --scope=@aits-genesis
```

### 3. Install

```bash
npm install @aits-genesis/core
npm install @aits-genesis/ui
# etc.
```

---

## Adding a New Library

Generate with the Angular CLI:

```bash
npx ng generate library @aits-genesis/<name> --directory=projects/libs/<name>
```

Then complete the wiring:

**`projects/libs/<name>/package.json`** — add:

```json
{
  "name": "@aits-genesis/<name>",
  "publishConfig": { "registry": "https://npm.pkg.github.com" }
}
```

**Root `package.json`** — update `build:libs`:

```json
"build:libs": "ng build @aits-genesis/<name>"
```

**`jest.config.js`** — add to `moduleNameMapper`:

```js
'^@aits-genesis/<name>/(.*)$': '<rootDir>/projects/libs/<name>/src/$1',
```

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/). The `commit-msg` hook (Husky + commitlint) enforces this.

```
<type>(<optional scope>): <short summary>
```

| Type       | Description  | Release |
| ---------- | ------------ | ------- |
| `feat`     | New feature  | minor   |
| `fix`      | Bug fix      | patch   |
| `perf`     | Performance  | patch   |
| `refactor` | Refactor     | patch   |
| `docs`     | Docs only    | —       |
| `test`     | Tests only   | —       |
| `chore`    | Maintenance  | —       |
| `build`    | Build system | —       |
| `ci`       | CI/CD        | —       |

Append `!` or add `BREAKING CHANGE:` footer for a **major** bump.

```bash
git commit -m "feat(core): add http error interceptor"
git commit -m "feat!: drop Angular 20 support"  # breaking → major
```

---

## Release Process

Releases are **fully automated** via [semantic-release](https://github.com/semantic-release/semantic-release).

| Push to | Result                                 |
| ------- | -------------------------------------- |
| `main`  | Stable release (e.g. `1.2.0`)          |
| `next`  | Pre-release (e.g. `1.2.0-next.1`)      |
| `beta`  | Beta pre-release (e.g. `1.2.0-beta.1`) |

On each release, semantic-release:

1. Analyses commits since last tag
2. Determines version bump (major / minor / patch)
3. Generates / updates `CHANGELOG.md`
4. Bumps `package.json` version
5. Creates a GitHub Release + git tag
6. Publishes all `dist/` packages to GitHub Packages

**No manual versioning. Do not edit `CHANGELOG.md` by hand.**

---

## Tech Stack

| Tool                                                                                               | Version | Purpose                           |
| -------------------------------------------------------------------------------------------------- | ------- | --------------------------------- |
| [Angular](https://angular.dev)                                                                     | 21      | Library framework                 |
| [TypeScript](https://www.typescriptlang.org)                                                       | 5.9     | Language                          |
| [ESLint](https://eslint.org) + [angular-eslint](https://github.com/angular-eslint/angular-eslint)  | 21      | Linting                           |
| [Prettier](https://prettier.io)                                                                    | 3       | Code formatting                   |
| [Jest](https://jestjs.io) + [jest-preset-angular](https://thymikee.github.io/jest-preset-angular/) | 30      | Unit testing                      |
| [Husky](https://typicode.github.io/husky/)                                                         | 9       | Git hooks                         |
| [lint-staged](https://github.com/lint-staged/lint-staged)                                          | 17      | Run linters on staged files       |
| [commitlint](https://commitlint.js.org)                                                            | 21      | Commit message linting            |
| [semantic-release](https://semantic-release.gitbook.io)                                            | 25      | Automated versioning & publishing |
| [GitHub Packages](https://github.com/features/packages)                                            | —       | npm registry                      |
| [GitHub Actions](https://github.com/features/actions)                                              | —       | CI/CD                             |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, branch strategy, and PR guidelines.

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

To report security vulnerabilities, see [SECURITY.md](SECURITY.md).

---

## License

[MIT](LICENSE) © 2026 AITS Genesis
