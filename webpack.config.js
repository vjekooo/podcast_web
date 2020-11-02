const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const { merge } = require('webpack-merge')
const modeConfig = (env) => require(`./build-utils/webpack.${env}`)(env)
const presetConfig = require('./build-utils/loadPresets')
const commonPaths = require('./build-utils/common-paths')

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
	return merge(
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
				new Dotenv({
					path: './.env'
				}),
				new HtmlWebpackPlugin({
					title: 'Podcast',
					dockerVersion: process.env.docker_version,
					meta: { 'build-id': process.env.docker_version, environment: process.env.NODE_ENV, test: 'Test' },
					template: 'public/index.html',
					favicon: 'public/favicon.ico'
				}),
				new webpack.ProgressPlugin()
			]
		},
		modeConfig(mode),
		presetConfig({ mode, presets })
	)
}
