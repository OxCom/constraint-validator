const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/validator.js',

    output: {
        path: path.resolve('dist'),
        filename: 'validator.js',
        library: 'validator',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true
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
