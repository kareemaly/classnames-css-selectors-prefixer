const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const prefixer = require('postcss-prefix-selector');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
            test: /\.css$/,
            use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    // you can specify a publicPath here
                    // by default it uses publicPath in webpackOptions.output
                    publicPath: '../',
                    hmr: process.env.NODE_ENV === 'development',
                  },
                },
                "css-loader", // translates CSS into CommonJS
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    plugins: () => [
                      prefixer({
                        prefix: process.env.WIDGET_NAME,
                        transform: function (prefix, selector, prefixedSelector) {
                          return `.${prefix}-${selector.replace('.', '')}`;
                        }
                      }),
                    ]
                  }
                }
            ]
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            'babel-loader'
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
      }),
      new webpack.DefinePlugin({
        'WIDGET_NAME': JSON.stringify(process.env.WIDGET_NAME)
      })
    ],
    devServer: {
      contentBase: './dist',
      port: 9000
    }
};

