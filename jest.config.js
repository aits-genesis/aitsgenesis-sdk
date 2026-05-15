/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(ts|js|mjs|cjs)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    ],
  },
  moduleNameMapper: {
    '^@aits-genesis/(.*)$': '<rootDir>/projects/aits-genesis/$1/src/public-api',
  },
  collectCoverageFrom: [
    'projects/**/*.ts',
    '!projects/**/*.spec.ts',
    '!projects/**/public-api.ts',
    '!projects/**/index.ts',
    '!projects/**/*.module.ts',
  ],
  coverageReporters: ['html', 'text', 'lcov'],
  coverageThreshold: {
    // Gradually increase these thresholds as test coverage improves.
    // Angular services/components require TestBed setup; for now enforce
    // a minimum that protects pure-utility regressions.
    global: {
      branches: 0,
      functions: 1,
      lines: 3,
      statements: 5,
    },
  },
  passWithNoTests: true,
};
