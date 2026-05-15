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
    '^@aitsgenesis/(.*)$': '<rootDir>/projects/libs/$1/src/public-api',
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
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  passWithNoTests: true,
};
