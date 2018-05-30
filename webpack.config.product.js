const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
require("babel-polyfill");

const rootSrc = __dirname + '/src';

module.exports = {
  mode: 'development',
  entry: rootSrc + '/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'index.bundle.js'
  },
  // devtool: 'cheap-module-eval-source-map', // 生产模式下不可用
  // devtool: 'none',
  // devServer: {
  //   contentBase: "./public", //本地服务器所加载的页面所在的目录
  //   historyApiFallback: true, //不跳转
  //   inline: true,
  //   hot: true,
  // },
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
                localIdentName: '[local][wj][hash:base64:6]',
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
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV: JSON.stringify('production'),
      }
    }),
    // new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    // 压缩代码
    new UglifyJsPlugin(),

    new HtmlWebpackPlugin({
      // 指定一个html模版，
      template: path.resolve(__dirname + '/public/index.html'),
    }),
    // 将css写入css文件，并注入html模版
    new ExtractTextPlugin({filename: 'index.min.css', allChunks: true}),

    // 存在build目录时，执行build命令，先删除以前的build目录
    new CleanWebpackPlugin(
      ['build'],　 //匹配删除的文件
      {
        root: __dirname,       　　　　　　　　　　//根目录
        verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
        dry:      false        　　　　　　　　　　//启用删除文件
      }
    )
  ],
};

console.log("process.env.NODE_ENV 的值是(webpack.config.prod.js)："+ process.env.NODE_ENV)