// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      'dist',
      'esm/*',
      'public/*',
      'tests/*',
      '*.config.js',
      'node_modules',
      'build'
    ],
    rules: {
      semi: ['error', 'always']
    }
  }
);
