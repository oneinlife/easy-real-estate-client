const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const resolver = require('postcss-import-alias-resolver');
const TerserPlugin = require('terser-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const __DEV__ = process.env.NODE_ENV === 'development';

const root = (_path = '.') => path.join(__dirname, _path);

const entryClient = [
  'core-js/modules/es.promise',
  'core-js/modules/es.array.iterator',
  './src/index.js',
];

const entryServer = [
  './dev-server.js',
];

const resolve = {
  extensions: ['.js', '.jsx'],
  modules: [path.resolve(__dirname, '../src'), 'node_modules'],
  alias: {
    components: path.resolve(__dirname, './src/components'),
    layouts: path.resolve(__dirname, './src/layouts'),
    styles: path.resolve(__dirname, './src/styles'),
    utils: path.resolve(__dirname, './src/utils'),
    mobx: path.resolve(__dirname, './node_modules/mobx/lib/mobx.es6.js'),
  }
};

const outputClient = {
  path: root('./dist'),
  filename: '[name].[hash].js',
  chunkFilename: '[name].[hash].bundle.js',
  publicPath: '/',
  jsonpScriptType: 'module',
};

const outputServer = {
  path: root('./dist'),
  filename: 'server.js',
  libraryTarget: 'commonjs2',
};

const cssLoaderOptions = DEBUG => ({
  importLoaders: 1,
  sourceMap: DEBUG,
  // CSS Modules https://github.com/css-modules/css-modules
  modules: true,
});

const postCssLoaderOptions = {
  parser: 'postcss-scss',
  modules: true,
  plugins: () => [
    require('postcss-import')({
      resolve: resolver({
        alias: { styles: path.resolve(__dirname, 'src/styles') }
      })
    }),
    require('precss')(),
    // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
    // https://github.com/robwierzbowski/node-pixrem
    require('pixrem')(),
    // PostCSS plugin for sass-like mixins
    // https://github.com/postcss/postcss-mixins
    require('postcss-mixins')(),
  ],
};

const loaders = [
  {
    test: /\.m?jsx?$/,
    loader: 'babel-loader',
    // include: [path.resolve(__dirname, '../src')],
    exclude: [
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

const loadersServer = [
  {
    test: /\.m?jsx?$/,
    loader: 'babel-loader',
    // include: [path.resolve(__dirname, '../src')],
    exclude: [
    ],
    options: {
      presets: [
        ['@babel/env', {
          modules: 'false',
        }],
      ],
    },
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
  new AssetsPlugin({
    path: path.resolve(__dirname, './build'),
    filename: 'assets.json',
  })
];

if (__DEV__) {
  /*plugins.push(
    new BundleAnalyzerPlugin()
  );
  */
  //entry.app.unshift(root('./build/dev-client.js'));

  /*
    plugins.push(
      //new webpack.HotModuleReplacementPlugin(),
      //new webpack.NoErrorsPlugin()
    );
    */
} else {
  plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
  );
}

module.exports = [{
  name: 'client',
  mode: __DEV__ ? 'development' : 'production',
  devtool: __DEV__ ? 'cheap-module-eval-source-map' : 'source-map',
  entry: entryClient,
  resolve,
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  output: outputClient,
  module: {
    rules: loaders
  },
  plugins,
  target: 'web',
}, {
  name: 'server',
  mode: __DEV__ ? 'development' : 'production',
  context: path.resolve(__dirname, './src'),
  entry: entryServer,
  resolve,
  output: outputServer,
  module: {
    rules: loadersServer,
  },
  plugins: [],
  target: 'node',
  externals: [
    /^\.\/assets$/,
    /^[@a-z][a-z\/\.\-0-9]*$/i,
    /^\.\.\/plugins/,
  ],
  node: {
    console: false,
    global: true,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
}];
