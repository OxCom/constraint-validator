import {terser} from 'rollup-plugin-terser';
import resolve  from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import babel    from 'rollup-plugin-babel';
import pkg      from './package.json';

export default {
    input: './src/validator.js',
    output: [
        {file: pkg.browser, format: 'umd', plugins: [terser()], name: 'constraint-validator'},
        {file: pkg.main, format: 'cjs', plugins: [terser()], exports: 'auto'},
        {file: pkg.module, format: 'esm', plugins: [terser()]},
    ],
    plugins: [
        resolve(),
        commonJS({
            include: 'node_modules/**'
        }),
        babel({
            presets: ['@babel/env'],
            plugins: [
                '@babel/plugin-proposal-class-properties'
            ]
        }),
    ],
    external: [
        'ipaddr.js',
        'locutus',
        'luxon',
    ]
};
