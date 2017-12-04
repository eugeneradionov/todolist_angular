
'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'app'),

    entry: {
        app: './app.js',
        // vendor: ['angular', 'angular-ui-router',
        //     'angular-cookie', 'angular-cookies',
        //     'ng-token-auth', 'angular-flash-alert'],
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        // filename: 'js/[name].js',
        filename: 'js/app.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            }, {
                test: /\.html$/,
                use: 'raw-loader',
            }, {
                test: /\.(css|scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                }),
            }, {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: 'url-loader?limit=100000',
            },
        ],
    },

    plugins: [
        new ExtractTextPlugin('styles/styles.css'),
        new ngAnnotatePlugin({
            add: true,
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        // }),
        new Dotenv({
            path: './.env',
            safe: true,
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],

    devServer: {
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Accept, X-Requested-With, content-type, Authorization',
        },
    },
};
