# Contributing to AITS Genesis SDK

Thank you for your interest in contributing! This document explains how to get involved.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Convention](#commit-convention)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Adding a New Library](#adding-a-new-library)
- [Release Process](#release-process)

---

## Code of Conduct

This project adheres to our [Code of Conduct](CODE_OF_CONDUCT.md). By participating you agree to uphold it.

---

## Getting Started

```bash
git clone git@github.com:aits-genesis/aitsgenesis-sdk.git
cd aitsgenesis-sdk
npm install        # installs deps + initialises Husky hooks via `prepare`
```

Verify the setup:

```bash
npm run lint          # ESLint
npm run format:check  # Prettier
npm test              # Jest
```

---

## Development Workflow

| Branch                       | Purpose                                     |
| ---------------------------- | ------------------------------------------- |
| `main`                       | Stable, production releases                 |
| `next`                       | Pre-release (`x.y.z-next.N`)                |
| `beta`                       | Beta pre-release (`x.y.z-beta.N`)           |
| `feat/*`, `fix/*`, `chore/*` | Feature branches — open a PR against `main` |

Branch naming:

```
feat/core-token-service
fix/ui-button-alignment
chore/update-angular-deps
```

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/). The `commit-msg` hook
(via Husky + commitlint) enforces this automatically.

```
<type>(<scope>): <short summary>
```

**Allowed types:**

| Type       | When to use                       | Release bump         |
| ---------- | --------------------------------- | -------------------- |
| `feat`     | New feature                       | minor                |
| `fix`      | Bug fix                           | patch                |
| `perf`     | Performance improvement           | patch                |
| `refactor` | Refactor without behaviour change | patch                |
| `docs`     | Documentation only                | patch (README scope) |
| `test`     | Tests only                        | —                    |
| `build`    | Build system / dependencies       | —                    |
| `ci`       | CI/CD changes                     | —                    |
| `chore`    | Maintenance, tooling              | —                    |
| `revert`   | Reverts a previous commit         | —                    |

**Breaking changes** — add `!` after type or add `BREAKING CHANGE:` footer → **major** bump.

```bash
# Examples
git commit -m "feat(core): add token refresh interceptor"
git commit -m "fix(ui): resolve tooltip overflow on small screens"
git commit -m "feat!: remove deprecated NgModule exports"  # breaking → major
```

---

## Submitting a Pull Request

1. **Fork** and create a branch from `main`
2. Make your changes with tests
3. Ensure all checks pass locally:
   ```bash
   npm run lint
   npm run format:check
   npm run test:coverage
   npm run build:all
   ```
4. Push and open a PR — the CI pipeline runs automatically
5. A maintainer will review; address feedback, then it gets merged

**PR title** must also follow Conventional Commits format (used for squash merges).

---

## Adding a New Library

Generate a library using the Angular CLI schematic:

```bash
npx ng generate library @aits-genesis/<name> --directory=projects/libs/<name>
```

Then:

1. Add `"publishConfig": { "registry": "https://npm.pkg.github.com" }` to the lib's `package.json`
2. Set the package name to `@aits-genesis/<name>`
3. Add the build command to `build:libs` in root `package.json`:
   ```json
   "build:libs": "ng build @aits-genesis/<name>"
   ```
4. Add the path alias to `jest.config.js` → `moduleNameMapper`:
   ```js
   '^@aits-genesis/<name>/(.*)$': '<rootDir>/projects/libs/<name>/src/$1',
   ```
5. Add an export barrel to `projects/libs/<name>/src/public-api.ts`

---

## Release Process

Releases are **fully automated** — you do not manually version or publish.

- Every merge to `main` → semantic-release analyses commits → bumps version → generates CHANGELOG → creates GitHub Release → publishes all `dist/` packages to GitHub Packages
- Every merge to `next` or `beta` → pre-release

Do **not** manually edit `CHANGELOG.md` or `package.json` version — they are managed by semantic-release.
