/**
 * Created by sargis on 6/9/17.
 */

import webpack from 'webpack'
import path from 'path'
import Config from 'webpack-config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import editorPackagejson from './package.json'
import pluginPackagejson from './node_modules/@koreez/phaser-particle-editor-plugin/package.json'
// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
const phaser = path.join(phaserModule, 'build/custom/phaser-arcade-physics.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')

export default new Config().merge({
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'src/com/koreez/particleeditor/ParticleEditor.js')
    ],
    vendor: ['pixi', 'phaser']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'/* chunkName= */,
      filename: 'vendor.bundle.js'/* filename= */
    }),

    new HtmlWebpackPlugin({
      template: 'index.template.ejs',
      hash: true,
      title: 'Phaser Particle Editor',
      editorVersion: editorPackagejson.version,
      pluginVersion: pluginPackagejson.version
    }),

    new CopyWebpackPlugin(
      [
        {from: 'assets', to: 'assets'},
        {from: 'index.js', to: ''}])
  ],

  module: {
    rules: [
      {test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src')},
      {test: /pixi\.js/, use: ['expose-loader?PIXI']},
      {test: /phaser-arcade-physics\.js$/, use: ['expose-loader?Phaser']}
    ]
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi
    }
  }
})
