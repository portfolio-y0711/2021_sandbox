const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: ['./src/js/main.js', './src/css/style.css'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                            "targets": {"chrome": "72"}, 
                            "debug": true
                            }
                        ]
                        ],
                        plugins: [
                            '@babel/plugin-proposal-object-rest-spread',
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-runtime'

                        ]
                    }
                }

            }, 
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        watchContentBase: true,
        compress: true,
        hot: true,
        port: 4000
    },
    plugins: [
        new HtmlWebpackPlugin({
            title : 'Index Title',
            hash : true,
            filename : 'index.html',
            template: './src/html/index.html'
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        }),
        // new webpack.IgnorePlugin({
        //     resourceRegExp: /^\.\/pouchdb-$/,
        // })
    ],
    optimization:{
        minimize: false, // <---- disables uglify.
        // minimizer: [new UglifyJsPlugin()] if you want to customize it.
    }
}
