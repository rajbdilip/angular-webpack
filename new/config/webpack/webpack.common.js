const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');
const helpers = require('./helpers');
const constants = require('./constants');

/*
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

/*
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  title: 'Ideal',
  description: 'DBS Angular 2 Template',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

const sassPaths = require("node-neat").includePaths.map(function(sassPath) {
  return "includePaths[]=" + sassPath;
}).join("&");


let extractCSS = new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    });

// const entry = {
//   'polyfills': './src/polyfills.ts',
//   'style': './src/style.ts',
//   'app': './src/main.ts'
// };

// if (isProd) {
//   entry.vendor = './src/vendor.ts'
// }

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
  isProd = options.env === 'production';
  return {

    /*
     * The entry point for the bundle
     * Our Angular.js app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: {

      'polyfills': './src/polyfills.ts',
      'style': './src/style.ts',
      'app': './src/main.ts'

    },

    /*
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

      /*
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.js', '.css', '.scss', '.json'],

      // An array of directory names to be resolved to the current directory
      modules: [helpers.root('src'), helpers.root('node_modules')],

    },

    module: {
      rules: [
        {
          enforce: 'pre',
          test: /^((?!(ngfactory|shim)).)*ts$/,
          loader: 'tslint-loader',
          exclude: [
            /node_modules/
          ],
        },
        {
          test: /\.ts$/,
          loader: 'string-replace-loader',
          query: {
            search: /(System|SystemJS)(.*[\n\r]\s*\.|\.)import\((.+)\)/g,
            replace: '$1.import($3).then(mod => (mod.__esModule && mod.default) ? mod.default : mod)'
          },
          include: [helpers.root('src')],
          enforce: 'pre'
        },

        /*
         * Typescript loader support for .ts and Angular 2 async routes via .async.ts
         * Replace templateUrl and stylesUrl with require()
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader
         * See: https://github.com/TheLarkInn/angular2-template-loader
         */
        {
          test: /\.ts$/,
          use: [
            '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
            'awesome-typescript-loader',
            'angular2-template-loader',
            'angular2-router-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        /*
          * Json loader support for *.json files.
          *
          * See: https://github.com/webpack/json-loader
          */
        {
          test: /\.(json)$/,
          loader: 'json-loader?name=[name].[ext]'
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          exclude: helpers.root('src', 'assets')
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader?name=assets/[name].[hash].[ext]'
        },
        {
          test: /\.css$/,
          exclude: helpers.root('src', 'app'),
          loader: extractCSS
            .extract({
                fallbackLoader: "style-loader",
                loader: ['css-loader' + (isProd ? '?minimize' : ''), 'postcss-loader']
            })
        },
        {
          test: /\main.scss$/,
          loader: extractCSS
            .extract({
                loader: ['css-loader' + (isProd ? '?minimize' : ''), 'sass-loader?' + sassPaths]
            })
        },
        {
          test: /\.scss$/,
          include: helpers.root('src', 'app'),
          loader: ['exports-loader?module.exports.toString()', 'css-loader', 'sass-loader?' + sassPaths]
        }
      ]
    },

    resolveLoader: {
      moduleExtensions: ['-loader']
    },

    /*
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [
      /*
        * Plugin: CopyWebpackPlugin
        * Description: Copy files and directories in webpack.
        *
        * Copies project static assets.
        *
        * See: https://www.npmjs.com/package/copy-webpack-plugin
        */
      new CopyWebpackPlugin([
        {
          from: 'src/assets/mock',
          to: 'mock'
        }
        // ,{
        //   from: 'src/assets/i18n',
        //   to: 'i18n'
        // }
      ]),
      /*
       * Plugin: ForkCheckerPlugin
       * Description: Do type checking in a separate process, so webpack don't need to wait.
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
       */
      new ForkCheckerPlugin(),      
      /*
       * Plugin: CommonsChunkPlugin
       * Description: Shares common code between the pages.
       * It identifies common modules and put them into a commons chunk.
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
       * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
       */      
      new CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),
      /**
       * Plugin: ContextReplacementPlugin
       * Description: Provides context to Angular's use of System.import
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
       * See: https://github.com/angular/angular/issues/11580
       */
      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        constants.CONTEXT_REPLACE_REGEX,
        helpers.root('./src') // location of your src
      ),

      new HtmlWebpackPlugin({
        template: 'src/assets/index.html',
        favicon: 'src/assets/favicon.ico',
        title: METADATA.title,
        chunksSortMode: 'dependency',
        metadata: METADATA,
        inject: 'head'
      }),
      /*
       * Plugin: ScriptExtHtmlWebpackPlugin
       * Description: Enhances html-webpack-plugin functionality
       * with different deployment options for your scripts including:
       *
       * See: https://github.com/numical/script-ext-html-webpack-plugin
       */
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),

      extractCSS,

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({}),
      
      new webpack.ProvidePlugin({
          jQuery: 'jquery',
          $: 'jquery',
          jquery: 'jquery'
      }),
    ],

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

  };
}