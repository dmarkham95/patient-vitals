module.exports = {
	env: {
		browser: true,
		es6: true,
		jest: true,
	},
	extends: [
		'airbnb-typescript',
		'airbnb/hooks',
		// 'plugin:@typescript-eslint/eslint-recommended',
		// 'plugin:@typescript-eslint/recommended',
		// 'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
		'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	settings: {
		react: {
			pragma: 'React',
			version: 'detect',
		},
		'import/resolver': {
			node: {
				paths: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
		project: './tsconfig.json',
	},
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
		// e.g. "@typescript-eslint/explicit-function-return-type": "off",
		'react/jsx-filename-extension': 0,
		'react/jsx-props-no-spreading': 0,
		'import/no-named-default': 0,
		'import/no-named-as-default': 0,
		'import/prefer-default-export': 0,
		'@typescript-eslint/ban-ts-ignore': 0,
		'jsx-a11y/accessible-emoji': 0,
		'no-param-reassign': 0,
	},
};
