import {terser} from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
    input: './src/validator.js',
    output: [
        {
            file: './dist/constraint-validator.js',
            format: 'umd',
            name: 'constraint-validator',
            plugins: [ terser() ]
        }
    ],
    plugins: [
        resolve(),
        commonJS({
            include: 'node_modules/**'
        }),
        babel({
            presets: ['@babel/env']
        })
    ]
};
