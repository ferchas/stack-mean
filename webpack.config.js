const config = require('config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const appEnv = process.env.NODE_ENV;

console.log(`Starting Webpack Build... Environment: ${appEnv}`);

module.exports = {
  entry: config.get('webpack.entryPoint'),
  output: {
    filename: config.get('webpack.bundles.js'),
    path: path.join(__dirname, 'public'),
    publicPath: config.get('webpack.public-path'),
  },
  mode: appEnv,
  plugins: [
    new HtmlWebpackPlugin({ // include bundles into html. Defined in entry
      filename: config.get('webpack.layout.fileName'),
      template: config.get('webpack.layout.template'),
    }),
    new MiniCssExtractPlugin({
      filename: config.get('webpack.bundles.css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.scss|.css$/,
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: false,
          }
        }],
      },
    ],
  },
  resolve: {
    alias: {
      '@-': path.resolve(__dirname, 'src/'),
    },
  },
};