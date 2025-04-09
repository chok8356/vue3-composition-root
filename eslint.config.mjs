import eslint from '@eslint/js'
import gitignore from 'eslint-config-flat-gitignore'
import perfectionist from 'eslint-plugin-perfectionist'
import unicorn from 'eslint-plugin-unicorn'
import vue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  gitignore(),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  unicorn.configs.recommended,
  perfectionist.configs['recommended-alphabetical'],
  ...vue.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.js', '**/*.vue'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'unicorn/filename-case': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    rules: {
      'perfectionist/sort-vue-attributes': 0,
      'vue/block-order': [
        'error',
        {
          order: ['template', 'script', 'style'],
        },
      ],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/define-macros-order': [
        'error',
        {
          defineExposeLast: false,
          order: ['defineProps', 'defineEmits'],
        },
      ],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          multiline: 'never',
          selfClosingTag: {
            multiline: 'never',
            singleline: 'never',
          },
          singleline: 'never',
        },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            component: 'always',
            normal: 'always',
            void: 'always',
          },
          math: 'always',
          svg: 'always',
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          multiline: {
            max: 1,
          },
          singleline: {
            max: 1,
          },
        },
      ],
      'vue/multi-word-component-names': 0,
      'vue/singleline-html-element-content-newline': 'off',
      'vue/v-on-event-hyphenation': ['error', 'never'],
    },
  },
  {
    files: ['env.d.ts'],
    rules: {
      'unicorn/prevent-abbreviations': 'off',
    },
  },
)
