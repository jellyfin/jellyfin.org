import { globalIgnores } from 'eslint/config';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import ts from 'typescript-eslint';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default ts.config([
  globalIgnores([
    'node_modules',
    'build',
    '**/.docusaurus',
    '**/.cache-loader',
    '**/.DS_Store',
    '**/.env.local',
    '**/.env.development.local',
    '**/.env.test.local',
    '**/.env.production.local',
    '**/npm-debug.log*',
    '**/yarn-debug.log*',
    '**/yarn-error.log*',
    '**/*.json'
  ]),
  react.configs.flat.recommended,
  reactHooks.configs.flat.recommended,
  ...ts.configs.recommended,
  jsxA11Y.flatConfigs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        JSX: 'readonly'
      },

      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  }
]);
