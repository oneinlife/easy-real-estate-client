const path = require('path');
const cssnano = require('cssnano');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];

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

const cssLoaderOptions = DEBUG => ({
  importLoaders: 1,
  sourceMap: DEBUG,
  // CSS Modules https://github.com/css-modules/css-modules
  modules: true,
  localIdentName: DEBUG ?
    '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
  // CSS Nano http://cssnano.co/options/
  minimize: !DEBUG,
  autoprefixer: false,
});

const postCssLoaderOptions = {
  parser: 'postcss-scss',
  modules: true,
  plugins: () => [
    require('postcss-import')(),
    require('precss')(),
    // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
    // https://github.com/robwierzbowski/node-pixrem
    require('pixrem')(),
    // PostCSS plugin for sass-like mixins
    // https://github.com/postcss/postcss-mixins
    require('postcss-mixins')(),
    require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
  ],
};

const loaders = [
  {
    test: /\.m?jsx?$/,
    loader: 'babel-loader',
    include: [path.resolve(__dirname, '../src')],
    exclude: [
      /core-js/,
      /regenerator-runtime/,
      /node_modules/,
    ],
  },
  {
    test: /\.scss$/,
    use: [
      { loader: 'isomorphic-style-loader' },
      {
        loader: 'css-loader',
        options: cssLoaderOptions(__DEV__),
      },
      {
        loader: 'postcss-loader',
        options: postCssLoaderOptions,
      },
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
  //entry.app.unshift(root('./build/dev-client.js'));

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
