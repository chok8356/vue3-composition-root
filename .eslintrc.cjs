/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:perfectionist/recommended-alphabetical',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  overrides: [
    {
      'extends': [
        'plugin:playwright/recommended',
      ],
      files: [
        'e2e/**/*.{test,spec}.{js,ts,jsx,tsx}',
      ],
    },
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  root: true,
  rules: {
    'perfectionist/sort-vue-attributes': 0,
    'vue/attribute-hyphenation': ['error', 'always'],
    'vue/attributes-order': [
      'error',
      {
        alphabetical: true,
      },
    ],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/component-options-name-casing': ['error', 'PascalCase'],
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'vue/custom-event-name-casing': ['error', 'kebab-case'],
    'vue/html-comment-content-spacing': ['error', 'never'],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          component: 'always',
          normal: 'always',
          void: 'any',
        },
        math: 'always',
        svg: 'always',
      },
    ],
    'vue/multi-word-component-names': 0,
    'vue/next-tick-style': ['error', 'promise'],
    'vue/order-in-components': 0,
    'vue/prefer-separate-static-class': ['error'],
    'vue/prefer-true-attribute-shorthand': ['error', 'always'],
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/v-on-event-hyphenation': ['error', 'always'],
  },
}
