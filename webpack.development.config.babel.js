/**
 * Created by sargis on 6/9/17.
 */
import Config from 'webpack-config'
import webpack from 'webpack'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

export const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
})

export const browserSyncPlugin = new BrowserSyncPlugin({
  host: process.env.IP || 'localhost',
  port: process.env.PORT || 3000,
  server: {
    baseDir: ['./dist', './build']
  }
})

export default new Config().extend('webpack.base.config.js').merge({
  watch: true,

  devtool: 'source-map',

  output: {
    pathinfo: true
  },

  plugins: [
    definePlugin,
    browserSyncPlugin
  ]
})
