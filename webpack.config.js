const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
	target: 'web',

	devtool: 'source-map',

	entry: [
		'babel-polyfill',
		'./src/index'
	],

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			// {
			// 	test: /\.css$/,
			// 	exclude: /node_modules/,
			// 	use: [ 'style-loader', 'css-loader' ]
			// }
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
		})
	],

	stats: {
		colors: true,
		modules: true,
		modulesSort: 'size',
		reasons: true,
	}
};
