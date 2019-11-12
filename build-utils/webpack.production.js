
const commonPaths = require('./common-paths')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = env => ({
	mode: env.mode,
	entry: {
		app: [`${commonPaths.appEntry}/index.tsx`]
	},
	output: {
		filename: 'js/[name].[chunkhash:8].js'
	},
	module: {
		rules: [
			{
				test: /\.(s*)css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			}
		]
	},
	devtool: 'source-map',
	optimization: {
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
			})
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style/[name]-[contenthash].css'
		}),
		new OptimizeCSSAssetsPlugin({
			assetNameRegExp: /\.optimize\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				preset: [
					'default',
					{ discardComments: { removeAll: true } }
				]
			}
		})
	]
})
