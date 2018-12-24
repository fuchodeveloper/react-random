const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "index.html"
});

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  plugins: [htmlWebpackPlugin]
};
