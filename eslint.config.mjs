import antfu from '@antfu/eslint-config'
import gitignore from 'eslint-config-flat-gitignore'
import perfectionist from 'eslint-plugin-perfectionist'

export default antfu(
  {
    jsonc: true,
    stylistic: {
      indent: 2,
      jsx: false,
      printWidth: 100,
      quotes: 'single',
      semi: false,
      trailingComma: 'all',
    },
    typescript: true,
    vue: true,
  },
  gitignore(),
  {
    rules: perfectionist.configs['recommended-alphabetical'].rules,
  },
  {
    files: ['**/*.{js,ts,vue}'],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/define-macros-order': [
        'error',
        { defineExposeLast: false, order: ['defineProps', 'defineEmits'] },
      ],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          multiline: 'never',
          selfClosingTag: { multiline: 'never', singleline: 'never' },
          singleline: 'never',
        },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: { component: 'always', normal: 'always', void: 'always' },
          math: 'always',
          svg: 'always',
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          multiline: 1,
          singleline: 1,
        },
      ],
      'vue/multi-word-component-names': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/v-on-event-hyphenation': ['error', 'never'],
    },
  },
)
