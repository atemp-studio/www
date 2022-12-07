const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
	entry: path.join(__dirname, 'src/ts/main.ts'),
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			// {
			// 	test: /\.(eot|svg|ttf|woff|woff2)$/,
			// 	loader: 'file-loader',
			// 	options: {
			// 		name: 'src/fonts/[name].[ext]',
			// 	},
			// },
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/index.html')
		})
	],
	mode: 'development',
	devServer: {
		port: 8080,
		static: {
			directory: path.join(__dirname, 'dist'),
		},
	},
	output: {
		filename: 'main.js',
		path: path.join(__dirname, 'dist'),
	}
};
