const fs = require('fs');

const { exclude: _, ...swcJestConfig } = JSON.parse(
  fs.readFileSync(`${__dirname}/.swcrc`, 'utf-8')
);

module.exports = {
  displayName: 'main-backend',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['@swc/jest', swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/main-backend',
  globalTeardown: './tests/teardown.ts'
};
