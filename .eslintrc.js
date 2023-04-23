module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    globals: {
        document: true,
        localStorage: true,
        SwaggerEditor: false,
        FormData: true,
        FileReader: true,
        Blob: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: 'tsconfig.eslint.json',
        tsconfigRootDir: __dirname,
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'react-hooks',
        'sonarjs',
        'no-loops',
        'no-use-extend-native',
        'promise',
        '@typescript-eslint/eslint-plugin',
        'simple-import-sort',
        'unused-imports',
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb',
        'airbnb-typescript',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:sonarjs/recommended',
        'plugin:promise/recommended',
    ],
    rules: {
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        indent: 'off',
        '@typescript-eslint/indent': ['error', 4],
        'no-undef': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'import/no-unresolved': 'off',
        'import/no-cycle': 'error',
        'import/prefer-default-export': 'off',
        'import/no-default-export': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'error',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'error',
        'react/function-component-definition': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'error',
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['warn', { ignoreDeclarationMerge: true }],
        'max-len': ['error', { ignoreComments: true, code: 120 }],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-unused-expressions': ['error', { allowTernary: true }],
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        'sonarjs/cognitive-complexity': ['error', 30],
        'no-loops/no-loops': 'error',
        'no-use-extend-native/no-use-extend-native': 'error',
        'arrow-parens': ['error', 'as-needed'],
        camelcase: [
            'warn',
            {
                ignoreDestructuring: true,
                ignoreImports: true,
                properties: 'never',
            },
        ],
        'no-console': [
            'warn',
            {
                allow: ['warn', 'error'],
            },
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1,
                maxEOF: 0,
            },
        ],
        'no-useless-constructor': 'warn',
        'unused-imports/no-unused-imports-ts': 'error',
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: ['return', 'break'],
            },
            {
                blankLine: 'always',
                prev: ['const', 'let'],
                next: '*',
            },
            {
                blankLine: 'any',
                prev: ['const', 'let'],
                next: ['const', 'let'],
            },
            {
                blankLine: 'always',
                prev: '*',
                next: 'if',
            },
            {
                blankLine: 'always',
                prev: 'if',
                next: '*',
            },
            {
                blankLine: 'always',
                prev: 'for',
                next: '*',
            },
            {
                blankLine: 'always',
                prev: '*',
                next: 'throw',
            },
        ],
        '@typescript-eslint/no-unused-expressions': [
            'error',
            {
                allowTernary: true,
            },
        ],
        '@typescript-eslint/no-empty-function': [
            'error',
            {
                allow: ['constructors'],
            },
        ],
        '@typescript-eslint/no-empty-interface': [
            'error',
            {
                allowSingleExtends: true,
            },
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: {
                    regex: '^I[A-Z]',
                    match: true,
                },
            },
            {
                selector: 'typeAlias',
                format: ['PascalCase'],
            },
            {
                selector: 'memberLike',
                modifiers: ['private'],
                format: ['camelCase', 'PascalCase'],
                leadingUnderscore: 'require',
            },
        ],
        'sort-imports': 'off',
        'import/order': 'off',
        'no-restricted-syntax': 'off',
        'class-methods-use-this': 'off',
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    // External packages. `react` related packages come first.
                    [
                        // Import type
                        '^react.*\\u0000$',
                        '^react',
                        // Import type
                        '^@?\\w.*\\u0000$',
                        '^@?\\w',
                    ],
                    // Internal packages.
                    [
                        // Import type
                        '^(components|containers|global|hoc|pages|store|utils)(/.*\\u0000|.*\\u0000$)',
                        '^(components|containers|global|hoc|pages|store|utils)(/.*|$)',
                    ],
                    [
                        // Import type
                        '^@?\\w.*\\u0000$',
                        '^[^.].*\\u0000$',
                        '^\\..*\\u0000$',
                        // Side effect imports.
                        '^\\u0000',
                        // Parent imports. Put `..` last.
                        '^\\.\\.(?!/?$)',
                        '^\\.\\./?$',
                        // Other relative imports. Put same-folder imports and `.` last.
                        '^\\./(?=.*/)(?!/?$)',
                        '^\\.(?!/?$)',
                        '^\\./?$',
                    ],
                    // Style imports.
                    ['^.+\\.s?css$'],
                ],
            },
        ],
    },
    overrides: [
        {
            files: ['src/**/*.slice.ts'],
            rules: { 'no-param-reassign': ['error', { props: false }] },
        },
    ],
};
