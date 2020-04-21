const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/validator.js',

    output: {
        path: path.resolve('dist'),
        filename: 'constraint-validator.js',
        library: 'constraint-validator',
        libraryTarget: 'commonjs-module',
        libraryExport: 'default'
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-transform-modules-commonjs',
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-object-rest-spread',
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-transform-object-assign',
                            ['@babel/plugin-proposal-pipeline-operator', {
                                'proposal': 'minimal',
                            }],
                        ],
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [new TerserPlugin({
            parallel: true,
            cache: true,
        })],
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
};
