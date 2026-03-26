/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-order'],
  rules: {
    'scss/at-rule-no-unknown': true,
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    'color-function-notation': null,
    'alpha-value-notation': null,
    'font-family-name-quotes': null,
    'declaration-block-no-shorthand-property-overrides': null
  }
};
