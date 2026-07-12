// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');

const noCyrillicRule = {
  meta: {
    type: 'problem',
    docs: { description: 'Disallow hardcoded Cyrillic strings — use Transloco instead' },
    schema: [],
  },
  create(context) {
    const CYRILLIC = /[а-яА-ЯіїєґІЇЄҐ]/;
    return {
      Literal(node) {
        if (typeof node.value === 'string' && CYRILLIC.test(node.value)) {
          context.report({
            node,
            message: 'Hardcoded Cyrillic string — move it to i18n JSON and use TranslocoService.',
          });
        }
      },
      TemplateElement(node) {
        if (CYRILLIC.test(node.value.raw)) {
          context.report({
            node,
            message: 'Hardcoded Cyrillic string in template literal — move it to i18n JSON.',
          });
        }
      },
    };
  },
};

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    ignores: ['**/*.spec.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      eslintConfigPrettier,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      local: { rules: { 'no-cyrillic-strings': noCyrillicRule } },
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'local/no-cyrillic-strings': 'error',
      '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
      eslintConfigPrettier,
    ],
    rules: {},
  },
]);
