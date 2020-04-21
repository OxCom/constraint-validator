require('@babel/register')({
    presets: ['@babel/env'],
    plugins: ['add-module-exports']
});

require('jsdom-global/register');
