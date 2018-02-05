'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'app'),

  entry: {
    app: './app.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
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
    new UglifyJSPlugin({
      compress: true,
      sourceMap: false,
      mangle: false,
      uglifyOptions: {
        output: {
          beautify: false,
          comments: false,
        },
      },
    }),
    new ngAnnotatePlugin({
      add: true,
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    }),
    new ExtractTextPlugin('styles/styles.css'),

    new Dotenv({
      path: './.env',
      safe: true,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
    }),
  ],
};
