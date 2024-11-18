import type { JestConfigWithTsJest } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: JestConfigWithTsJest = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',

  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
    useESM: true
  })
};

export default config;
