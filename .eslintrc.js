module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Prettier integration
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto', // Resolves line-ending issues
      },
    ],
    // TypeScript rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // React rules (add more as needed)
    'react/prop-types': 'off', // Disable if using TypeScript for props validation
  },
};
