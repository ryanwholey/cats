var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: [
    'babel-polyfill',
    './client/index.jsx'
  ],
  output: {
    path: './build',
    filename: 'bundle.js',
  },
  module: {
    loaders:[
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: [/node_modules/]
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "file-loader?name=[name].[ext]"
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'host': JSON.stringify('192.241.234.14')
      }
    })
  ]
};








