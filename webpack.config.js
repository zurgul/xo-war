const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // NODE_ENV === 'production'

const NODE_ENV = process.env.NODE_ENV || 'dev';

const plugins = [
	new CleanWebpackPlugin(['build']),
	new HtmlWebpackPlugin({
		hash: true,
		template: './src/index.html'
	})
];
if (NODE_ENV === 'prod') { plugins.push(new UglifyJsPlugin()) } // { sourceMap: true }

// new webpack.DefinePlugin({
// 	'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
// })

module.exports = {
	target: 'web',

	devtool: 'source-map',
	mode: 'development',
	
	entry: [
		'babel-polyfill',
		'./src/index'
	],

	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},

	module: {
		rules: [
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

	plugins,

	stats: {
		colors: true,
		modules: true,
		modulesSort: 'size',
		reasons: true,
	}
};
