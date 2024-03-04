module.exports = {
  env: {
    browser: true,
  },
  plugins: ['react', 'import', 'react-hooks', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: true,
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'no-debugger': 0,
    'no-console': 0,
    'no-empty': 0,
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
    'no-nested-ternary': 0,
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/default-props-match-prop-types': 0,
    'react/destructuring-assignment': 0,
    'react/function-component-definition': [
      1,
      {
        namedComponents: ['arrow-function'],
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*'],
      },
    ],
    'no-param-reassign': [
      2,
      {
        props: true,
        ignorePropertyModificationsFor: ['current', 'state', 'draft', 'lang'],
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-shadow': 0,
    '@typescript-eslint/no-unused-vars': 1,
    // 'import/order': [
    //   'error',
    //   {
    //     groups: [
    //       'builtin',
    //       'type',
    //       ['external', 'internal'],
    //       'unknown',
    //       ['sibling', 'parent', 'index'],
    //     ],
    //     'newlines-between': 'always',
    //     pathGroups: [
    //       {
    //         pattern: 'react*',
    //         group: 'builtin',
    //         position: 'before',
    //       },
    //       {
    //         pattern: '{wmsComponent,dto,highchart,param,sttsDto,wms}',
    //         group: 'type',
    //       },
    //       {
    //         pattern: '@{components,hooks,business,pages,assets,store,src}/**',
    //         group: 'unknown',
    //       },
    //     ],
    //     alphabetize: {
    //       order:
    //         'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
    //       caseInsensitive: true /* ignore case. Options: [true, false] */,
    //     },
    //   },
    // ],
  },
  ignorePatterns: [
    '/src/react-app-env.d.ts',
    '/src/reportWebVitals.ts',
    '/src/setupTests.ts',
    '/.yarn/*',
    '/.vscode/*',
    '/craco.config.ts',
    '/.eslintrc.cjs',
    '/src/store/slice/*',
    '/src/test/*',
  ],
};
