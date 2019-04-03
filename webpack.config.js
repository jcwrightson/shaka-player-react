const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require('path');

module.exports = {
  entry: ['./src/index.js'],
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
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    })
  ],
  devServer: {
    port: 3030,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true
  }
};
