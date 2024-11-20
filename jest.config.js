module.exports = {
    coverageDirectory: '../../coverage/apps/article',
    setupFilesAfterEnv: ['/setup-jest.ts'],
    snapshotSerializers: [
      'jest-preset-angular/build/serializers/no-ng-attributes',
      'jest-preset-angular/build/serializers/ng-snapshot',
      'jest-preset-angular/build/serializers/html-comment',
    ],
    globals: {
      'ts-jest': {
        tsconfig: '/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    },
    displayName: 'article',
    transform: {
      '^.+\\.(ts|js|html)$': 'ts-jest',
    },
  };
  
  