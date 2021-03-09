module.exports = {
    extends: ['react-app', 'prettier'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': ['warn', { endOfLine: 'auto' }],
        'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
        camelcase: 0,
        indent: 0,
        dangerouslySetInnerHTML: 0,
        'jsx-a11y/anchor-is-valid': 0,
        'no-useless-escape': 0,
        'import/no-anonymous-default-export': 0,
    },
};
