const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  entry: ['babel-polyfill', './src/index.jsx'],
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.(png|svg|jpg|gif|jpeg)$/,
      use: [
        'file-loader',
      ],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
