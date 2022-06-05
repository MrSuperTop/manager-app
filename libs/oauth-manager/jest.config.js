const fs = require('fs');

// Reading the SWC compilation config and remove the "exclude"
// for the test files to be compiled by SWC
const { exclude: _, ...swcJestConfig } = JSON.parse(
  fs.readFileSync(`${__dirname}/.lib.swcrc`, 'utf-8')
);

module.exports = {
  displayName: 'oauth-manager',
  preset: '../../jest.preset.js',
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", swcJestConfig],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/oauth-manager',
  setupFilesAfterEnv: ['./jest.setup.ts']
};
