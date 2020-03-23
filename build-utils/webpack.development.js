const commonPaths = require('./common-paths')
const webpack = require('webpack')

const port = process.env.PORT || 3000

module.exports = (env) => ({
	mode: env.mode,
	entry: {
		app: [`${commonPaths.appEntry}/index.tsx`]
	},
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom'
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	output: {
		filename: '[name].[hash].js',
		publicPath: '/'
	},
	module: {
		rules: []
	},
	devtool: 'inline-source-map',
	devServer: {
		host: 'localhost',
		port: port,
		historyApiFallback: true,
		open: true,
		hot: true,
		stats: 'minimal',
		overlay: {
			errors: true,
			warnings: false
		}
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
})
