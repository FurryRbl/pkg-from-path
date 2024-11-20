import eslint from '@eslint/js';
import nodePlugin from 'eslint-plugin-n';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
	eslint.configs.recommended,
	nodePlugin.configs['flat/recommended-module'],
	eslintPluginPrettierRecommended,
	{
		languageOptions: {
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
		},
		rules: {
			eqeqeq: ['error', 'always'],
			'prettier/prettier': ['off', 'always'],
		},
		ignores: ['node_modules'],
	},
];
