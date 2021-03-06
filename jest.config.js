module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  testMatch: ['<rootDir>/test/**/*.ts'],
  coverageDirectory: 'dist/test-coverage',
  coverageReporters: ['html', 'text'],
  collectCoverageFrom: [
    '<rootDir>/main/**/*.ts',
  ],
  rootDir: __dirname
};