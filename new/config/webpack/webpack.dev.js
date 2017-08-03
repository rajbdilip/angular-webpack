const webpack = require('webpack');
const helpers = require('./helpers');
const constants = require('./constants');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8090;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR
});

/**
 * dll checking
 */
let polyfillsManifest;
let vendorManifest;
try {
  polyfillsManifest = require(helpers.root(constants.DLL_DIST, 'polyfills-manifest.json'));
  vendorManifest = require(helpers.root(constants.DLL_DIST, 'vendor-manifest.json'));
} catch (e) {
  throw 'Please rebuild DLL first by running `npm run build:dll`';
}

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
  return webpackMerge(commonConfig({env: ENV}), {

    // devtool: 'source-map',

    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'cheap-module-source-map',
    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {
      /**
       * The output directory as absolute path (required).
       *
       * See: http://webpack.github.io/docs/configuration.html#output-path
       */      
      path: helpers.root('dist'),
      /**
       * pecifies the public URL address of the output files when referenced in a browser
       *
       * http://webpack.github.io/docs/configuration.html#output-publicpath
       */
      publicPath: 'http://localhost:8090/',
      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * See: http://webpack.github.io/docs/configuration.html#output-filename
       */      
      filename: '[name].bundle.js',
      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
       */
      sourceMapFilename: '[name].map',
       /** The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
       */
      chunkFilename: '[id].chunk.js',
    },

    plugins: [
      new webpack.DllReferencePlugin({
        context: '.',
        manifest: polyfillsManifest
      }),
      new webpack.DllReferencePlugin({
        context: '.',
        manifest: vendorManifest
      }),
      new AddAssetHtmlPlugin([
        { filepath: constants.DLL_DIST + '/polyfills.dll.js', includeSourcemap: false },
        { filepath: constants.DLL_DIST + '/vendor.dll.js', includeSourcemap: false }
      ]),
      /**
       * Plugin: DefinePlugin
       * Description: Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       *
       * Environment helpers
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': METADATA.HMR,
        }
      }),
      new webpack.HotModuleReplacementPlugin(),
      // new DashboardPlugin(),
      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */      
      new webpack.LoaderOptionsPlugin({
        debug: true,
        options: {
          context: helpers.root('src'),
          output: {
            path: helpers.root('dist')
          },
          postcss: [require('postcss-cssnext')],
          /**
           * Static analysis linter for TypeScript advanced options configuration
           * Description: An extensible linter for the TypeScript language.
           *
           * See: https://github.com/wbuchwalter/tslint-loader
           */          
          tslint: {
            emitError: false,
            failOnHint: false,
            resourcePath: 'src'
          }
        }
      })
    ],

    /**
     * Webpack Development Server configuration
     * Description: The webpack-dev-server is a little node.js Express server.
     * The server emits information about the compilation state to the client,
     * which reacts to those events.
     *
     * See: https://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      hot: true,
      historyApiFallback: true,
      contentBase: './src/assets',
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  });
};