var path = require('path');

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
    // preLoaders:[
    //   {
    //     test: /(\.js$|\.jsx$)/, 
    //     exclude: /node_modules/, 
    //     loader: "eslint-loader"
    //   }
    // ],
    loaders:[
      {
        test: /\.jsx?$/,
        loaders: ['react-hot','babel'],
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
  eslint: {
    configFile: '.eslintrc'
  }
};
