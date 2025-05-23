export default {
  extends: ['stylelint-config-standard'],
  overrides: [
    {
      customSyntax: 'postcss-html',
      files: ['**/*.vue'],
    },
  ],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true,
    'selector-class-pattern': null,
  },
}
