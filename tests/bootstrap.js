require('@babel/register')({
    presets: ['@babel/preset-env'],
    plugins: ['add-module-exports']
});

require('jsdom-global/register');
