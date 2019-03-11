/* global __dirname */ // to stop the linter complaining

// In webpack.config.js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  devtool: 'source-map',
  entry: [
    './app/index.js'
  ],
  devServer: {
    inline: true,
    port: 3002
  },
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [HTMLWebpackPluginConfig]
};





// var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');


// module.exports = {
//   entry: './app/index.js',
//     output: {
//       path: path.resolve(__dirname, 'dist'),
//       filename: 'index_bundle.js',
//       publicPath: '/'     
//   },
//   module: {
//     rules: [
//       { test: /\.(js)$/, use: 'babel-loader'},
//       { test: /\.css$/, use: [ 'style-loader', 'css-loader'] }
//     ]
//   },
//   mode: 'development',
//   devServer: {
//     historyApiFallback: true
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: 'app/index.html'
//     })
//   ]
// };