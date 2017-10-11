import Config from 'webpack-config'
import webpack from 'webpack'
import { browserSyncPlugin, definePlugin } from './webpack.development.config.babel'

export default new Config().extend({
  'webpack.development.config.babel.js': config => {
    delete config.devtool
    delete config.output.pathinfo
    delete config.watch
    const browserSyncPluginIndex = config.plugins.indexOf(browserSyncPlugin)
    config.plugins.splice(browserSyncPluginIndex, 1)
    const definePluginIndex = config.plugins.indexOf(definePlugin)
    config.plugins.splice(definePluginIndex, 1)
    return config
  }
}).merge({
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      output: {
        comments: false
      },
      compress: {
        warnings: false
      }
    })
  ]
})
