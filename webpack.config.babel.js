const path = require('path');
const cssnano = require('cssnano');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const __DEV__ = process.env.NODE_ENV === 'development';

let devtool = 'cheap-module-eval-source-map';

const root = (_path = '.') => path.join(__dirname, _path);

const entry = {
  app: [root('./src/index.js')]
};

const resolve = {
  extensions: ['.js', '.jsx'],
  modules: [path.resolve(__dirname, '../src'), 'node_modules'],
  alias: {
    components: path.resolve(__dirname, './src/components'),
    layouts: path.resolve(__dirname, './src/layouts'),
  }
};

const output = {
  path: root('./dist'),
  filename: '[name].[hash].js',
  publicPath: '/'
};

const baseCssLoader =
  'css-loader?sourceMap&-minimize&' +
  'modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]';

const loaders = [
  {
    test: /\.m?jsx?$/,
    loader: 'babel-loader',
    exclude: [
      /core-js/,
      /regenerator-runtime/,
      /node_modules/,
    ],
  },
  { test: /\.woff(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/, loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/, loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
];

const postcss = [
  cssnano({
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  })
];

const plugins = [
  new webpack.DefinePlugin({
    __DEV__
  }),
  new HtmlWebpackPlugin({
    template: root('./src/index.ejs'),
    filename: root('./dist/index.html'),
    title: 'Preact Starter',
    inject: 'body'
  }),
  new ScriptExtHtmlWebpackPlugin({
    module: /\.js$/
  })
];

if (__DEV__) {
  entry.app.unshift(root('./build/dev-client.js'));

/*
  plugins.push(
    //new webpack.HotModuleReplacementPlugin(),
    //new webpack.NoErrorsPlugin()
  );
  */
} else {
  devtool = 'source-map';

  entry.vendor = [
    'preact',
    'react-router',
    'mobx',
    'mobx-preact'
  ];

  plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    /*new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),*/
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),

  );
}

module.exports = {
  devtool,
  entry,
  resolve,
  output,
  module: {
    rules: loaders
  },
  plugins,
};
