const ts = require('@typescript-eslint/parser');
const jestPlugin = require('eslint-plugin-jest');

/** @type {import('eslint').Linter.FlatConfig} */
module.exports = [
  {
    languageOptions: {
      parser: ts,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
      globals: {
        window: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      jest: jestPlugin,
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
      'prettier/prettier': 'error',
    },
  },
];
