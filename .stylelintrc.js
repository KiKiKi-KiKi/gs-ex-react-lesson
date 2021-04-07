module.exports = {
  plugins: ['stylelint-order'],
  extends: [
    './node_modules/stylelint-config-standard',
    './node_modules/prettier-stylelint/config.js'
  ],
  ignoreFiles: [
    '**/node_modules/**',
  ],
  rules: {
    'indentation': 2,
    'string-quotes': 'single',
    'order/properties-alphabetical-order': true
  },
};
