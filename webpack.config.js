const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

module.exports = {
	entry: ["./src/index.js", "./src/styles.scss"],
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /(node_modules|bower_components)/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			},
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
			filename: "./index.html"
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		})
	],
	devtool: "inline-source-map",
	devServer: {
		port: 3030,
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		historyApiFallback: true
	}
}
