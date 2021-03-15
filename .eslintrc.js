module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  settings: {
    react: {
      // cf. https://github.com/yannickcr/eslint-plugin-react#configuration
      version: 'detect',
    },
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'jest'],
  rules: {
    'eol-last': ['error', 'always'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'newline-before-return': 'error',
    'no-console': 'warn',
    'no-dupe-class-members': 'error',
    'no-var': 'error',
    'object-shorthand': ['error', 'always'],
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-spread': 'error',
    'require-yield': 'error',
    // jsxを1行で記述しなくてもよくする
    'react/jsx-one-expression-per-line': 0,
    // disabled prop-type
    'react/prop-types': 0,
    // import React from 'react' 無しを許可
    'react/react-in-jsx-scope': 'off',
  },
};
