module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  extends: [
    'plugin:lodash/recommended',
    'prettier',
    'standard',
    'eslint:recommended',
  ],
  parser: 'babel-eslint',
  plugins: ['lodash', 'prettier', 'svelte3'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  rules: {
    'comma-dangle': ['error', 'only-multiline'],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],
    'import/order': [
      'error',
      { alphabetize: { order: 'asc', caseInsensitive: true } },
    ],
    'prettier/prettier': 'error',
    'space-before-function-paren': 'off',
  },
}
