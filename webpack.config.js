
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

const webpackMerge = require('webpack-merge')
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env)
const presetConfig = require('./build-utils/loadPresets')
const commonPaths = require('./build-utils/common-paths')

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {

	const currentPath = path.join(__dirname)
	const basePath = currentPath + '/.env'
	const envPath = basePath + '.' + mode
	const finalPath = fs.existsSync(envPath) ? envPath : basePath
	const fileEnv = dotenv.config({ path: finalPath }).parsed

	const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
		prev[`process.env.${next}`] = JSON.stringify(fileEnv[next])
		return prev
	}, {})

	return webpackMerge(
		{
			mode,
			entry: {
				vendor: ['react', 'react-dom']
			},
			output: {
				path: commonPaths.outputPath
			},
			resolve: {
				extensions: ['.ts', '.tsx', '.js', '.json']
			},
			module: {
				rules: [
					{
						test: /\.(ts|tsx|js)$/,
						enforce: 'pre',
						loader: 'eslint-loader',
						include: commonPaths.appEntry
					},
					{
						test: /\.tsx?$/,
						include: commonPaths.appEntry,
						use: 'babel-loader'
					},
					{
						test: /\.json$/,
						use: 'json',
						include: commonPaths.appEntry
					},
					{
						test: /\.(gif|png|jpe?g|svg)$/i,
						include: `${commonPaths.appEntry}/images`,
						use: [
							{
								loader: 'file-loader',
								options: {
									name: 'images/[hash:8]-[name].[ext]'
								}
							},
							{
								loader: 'image-webpack-loader',
								options: {
									mozjpeg: {
										progressive: true,
										quality: 70
									},
									optipng: {
										optimizationLevel: 7
									},
									pngquant: {
										quality: '65-90',
										speed: 4
									},
									gifsicle: {
										interlaced: false
									}
								}
							}
						]
					}
				]
			},
			optimization: {
				splitChunks: {
					cacheGroups: {
						vendor: {
							chunks: 'initial',
							test: 'vendor',
							name: 'vendor',
							enforce: true
						}
					}
				}
			},
			plugins: [
				new HtmlWebpackPlugin({
					title: 'Podcast',
					template: 'public/index.html',
					favicon: 'public/favicon.ico'
				}),
				new webpack.ProgressPlugin(),
				new webpack.DefinePlugin(envKeys)
			]
		},
		modeConfig(mode),
		presetConfig({ mode, presets })
	)
}
