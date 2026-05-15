# AITS Genesis SDK

> Angular library monorepo for the [AITS Genesis](https://github.com/aits-genesis) platform.

[![CI](https://github.com/aits-genesis/aitsgenesis-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/aits-genesis/aitsgenesis-sdk/actions/workflows/ci.yml)
[![semantic-release](https://img.shields.io/badge/semantic--release-conventionalcommits-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

---

## Overview

`aitsgenesis-sdk` is a **monorepo Angular workspace** hosting all shared Angular libraries published under the `@aitsgenesis/*` npm namespace. Libraries live in `projects/libs/` and are built independently, allowing downstream applications to install only what they need.

## Repository Structure

```
aitsgenesis-sdk/
├── projects/
│   └── libs/                  # Library source (one dir per package)
│       └── <lib-name>/        # e.g. core, ui, auth, ...
├── dist/                      # Build output (git-ignored)
├── .github/
│   └── workflows/
│       ├── ci.yml             # Lint + test + build on every PR/push
│       └── release.yml        # Automated semantic-release on main
├── eslint.config.js           # ESLint (angular-eslint)
├── jest.config.js             # Jest (jest-preset-angular)
├── commitlint.config.js       # Conventional commits enforcement
├── .prettierrc                # Prettier formatting rules
├── .releaserc.json            # semantic-release configuration
└── tsconfig.json              # Root TypeScript config
```

## Getting Started

```bash
npm install

# Lint all library source
npm run lint

# Format all source
npm run format

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Adding a Library

Use the Angular CLI schematic to generate a new library inside the `projects/libs/` directory:

```bash
npx ng generate library @aitsgenesis/<name> --directory=projects/libs/<name>
```

Then update `package.json`:

- Add the build command to `build:libs`
- Add the path mapping to `jest.config.js` -> `moduleNameMapper`

## Commit Convention

This repo follows [Conventional Commits](https://www.conventionalcommits.org/).
The Husky `commit-msg` hook enforces this via `commitlint`.

Allowed types: `feat` | `fix` | `docs` | `style` | `refactor` | `test` | `chore` | `build` | `ci` | `perf` | `revert`

## Releasing

Releases are fully automated via [semantic-release](https://github.com/semantic-release/semantic-release):

- Push to `main` -> stable release
- Push to `next` -> pre-release (`x.y.z-next.N`)
- Push to `beta` -> pre-release (`x.y.z-beta.N`)

**Required GitHub Secrets:**
| Secret | Description |
|--------|-------------|
| `NPM_TOKEN` | npm automation token for publishing `@aitsgenesis/*` packages |
| `GITHUB_TOKEN` | Auto-provided by GitHub Actions |

## Tech Stack

| Tool                       | Purpose                           |
| -------------------------- | --------------------------------- |
| Angular 21                 | Library framework                 |
| TypeScript 5.9             | Language                          |
| ESLint + angular-eslint    | Linting                           |
| Prettier                   | Code formatting                   |
| Jest + jest-preset-angular | Unit testing                      |
| Husky + lint-staged        | Git hooks                         |
| commitlint                 | Commit message enforcement        |
| semantic-release           | Automated versioning & publishing |
| GitHub Actions             | CI/CD                             |

## License

MIT
