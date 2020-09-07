import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
    input: './src/validator.js',
    output: [
        { file: './dist/constraint-validator.umd.js', sourcemap: true, format: 'umd', plugins: [ terser() ], name: 'constraint-validator' },
        { file: './dist/constraint-validator.cjs.js', sourcemap: true, format: 'cjs', plugins: [ terser() ] },
        { file: './dist/constraint-validator.esm.js', sourcemap: true, format: 'es', plugins: [ terser() ] },
    ],
    plugins: [
        resolve(),
        commonJS({
            include: 'node_modules/**'
        }),
        babel({
            presets: ['@babel/env']
        }),
        sourcemaps(),
    ]
};
