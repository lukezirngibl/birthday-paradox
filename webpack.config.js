var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var extractTextPlugin = new ExtractTextPlugin({
  filename: 'main.css',
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-0']
          },
        }]
      },
    ]
  },
  plugins: [
    extractTextPlugin,
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
      sourceMap: true,
      chunksSortMode: 'dependency'
    }),
  ]
};
