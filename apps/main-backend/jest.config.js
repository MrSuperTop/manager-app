const { readFileSync } = require('fs');

const config = JSON.parse(readFileSync(`${__dirname}/.swcrc`, 'utf-8'))

/** @type {import('ts-jest').InitialOptionsTsJest} */
module.exports = {
  displayName: 'main-backend',
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', { ...config, /* custom configuration in Jest */ }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/main-backend',
  globalTeardown: './tests/teardown.ts',
  "moduleNameMapper": {
    "@nx-manager-app/oauth-manager": "<rootDir>/../../libs/oauth-manager/src/index.ts",
    "@nx-manager-app/session-handler": "<rootDir>/../../libs/session-handler/src/index.ts",
    "@nx-manager-app/shared-utils": "<rootDir>/../../libs/shared-utils/lib/index.ts",
    "@nx-manager-app/test-client": "<rootDir>/../../libs/test-client/src/index.ts",
    "@nx-manager-app/ui": "<rootDir>/../../libs/ui/lib/index.ts"
  }
};
