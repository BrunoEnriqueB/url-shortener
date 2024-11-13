import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  projects: [
    {
      testPathIgnorePatterns: ['<rootDir>/node_modules/'],
      preset: 'ts-jest',
      displayName: 'my-package',
      testMatch: ['<rootDir>/src/__tests__/**/*.spec.ts']
    }
  ]
};
export default config;
