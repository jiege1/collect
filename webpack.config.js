const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
require("babel-polyfill");

const rootSrc = __dirname + '/src';

module.exports = {
  mode: 'development',
  entry: {
    index: rootSrc + '/index.js',
    mock: rootSrc + '/mock/index.js',
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].js'
  },
  devtool: 'cheap-module-eval-source-map', // 生产模式下不可用
  // devtool: 'none',
  devServer: {
    contentBase: "./public", //本地服务器所加载的页面所在的目录
    historyApiFallback: true, //不跳转
    inline: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                localIdentName: '[local][hash:base64:6]',
                modules: true,
                camelCase: true
              }
            },
            {
              loader: 'less-loader'
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  resolve: {
    alias: {
      core: path.join(__dirname, 'core'),
      components: rootSrc + '/components',
      common: rootSrc + '/common',
    },
  },
  plugins: [
    // 注入node环境变量 process.env.NODE_ENV 拿到
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: JSON.stringify('development'),
      }
    }),
    // 启动webpack-dev-server时，自动打开浏览器
    new OpenBrowserPlugin({ url: 'http://localhost:8080/' }),
    new HtmlWebpackPlugin({
      // 指定一个html模版，
      template: path.resolve(__dirname + '/public/index.html'),
    }),
    // 将css写入css文件，并注入html模版
    new ExtractTextPlugin({filename: 'index.min.css', allChunks: true}),
  ],
};