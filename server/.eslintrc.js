module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    'extends': [
        'eslint:recommended',
        'google',
        'prettier',
    ],
    parserOptions: {
        ecmaVersion: 8,
        impliedStrict: true,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
        },
        sourceType: 'module',
    },
    plugins: [
        'prettier',
    ],
    rules: {
        'prettier/prettier': [
            'error',
            {
                useTabs: false,
                printWidth: 120,
                tabWidth: 4,
                singleQuote: true,
                trailingComma: 'all',
                bracketSpacing: true,
                jsxBracketSameLine: false,
                parser: 'flow',
                semi: true,
            },
        ],
        'no-console': 'off',
        'require-jsdoc': 'off',
        'no-irregular-whitespace': 'off',
    },
};
