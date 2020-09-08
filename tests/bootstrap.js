require('@babel/register')({
    presets: ['@babel/env'],
    plugins: [
        '@babel/plugin-proposal-class-properties',
        'add-module-exports',
    ]
});

require('jsdom-global/register');
