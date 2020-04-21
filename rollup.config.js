import {terser} from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

// "main": "dist/how-long-till-lunch.cjs.js",
//     "module": "dist/how-long-till-lunch.esm.js",
//     "browser": "dist/how-long-till-lunch.umd.js",

export default {
    input: './src/validator.js',
    output: [
        { file: './dist/constraint-validator.umd.js', format: 'umd', plugins: [ terser() ], name: 'constraint-validator' },
        { file: './dist/constraint-validator.cjs.js', format: 'cjs', plugins: [ terser() ] },
        { file: './dist/constraint-validator.esm.js', format: 'es', plugins: [ terser() ] },
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
