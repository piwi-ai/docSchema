import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    {
        ignores: ['dist/**', 'node_modules/**', 'configs/**', 'documents/**', 'coverage/**'],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: typescriptEslintParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslintPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            // Manually apply recommended rules since we aren't using the newer 'typescript-eslint' package's flat config helper
            ...typescriptEslintPlugin.configs.recommended.rules,
            // Apply prettier config (disables conflicting rules)
            ...prettierConfig.rules,

            'prettier/prettier': ['error', { endOfLine: 'auto' }],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
];
