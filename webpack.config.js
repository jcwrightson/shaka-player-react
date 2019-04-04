const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require("path");

module.exports = {
  entry: ["./src/index.js", "./src/index.html"],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,

        loader: "babel-loader",

        options: {
          plugins: [
            ["@babel/plugin-transform-runtime"],
            ["@babel/plugin-proposal-class-properties"]
          ]
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
  devtool: "inline-source-map",
  devServer: {
    port: 3030,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true
  }
};
