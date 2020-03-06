const os = require('os');
const path = require('path');
const ip = require('my-local-ip');
const colors = require('colors');
const process = require('process');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const MiniCssExtractPlugin = require('extract-css-chunks-webpack-plugin');

const envPort = process.env.PORT;
const port = envPort ? envPort : 4000;

const isPrivate = process.env.PRIVATE || false;

const platform = os.platform().toLowerCase();

const isLinux = platform === 'linux';
const isWindows = platform === 'win32' || platform === 'win64';

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const mode = process.env.NODE_ENV;

const linter = {
  test: /\.(js|jsx|mjs)$/,
  enforce: 'pre',
  use: [
    {
      options: {
        formatter: eslintFormatter,
        eslintPath: require.resolve('eslint'),
        
      },
      loader: require.resolve('eslint-loader'),
    },
  ],
  include: path.resolve(__dirname, 'src'),
};

const imgLoad = {
  test: /\.(gif|png|jpe?g)$/i,
  loader: require.resolve('url-loader'),
  options: {
    limit: 10000,
    name: 'static/media/[name].[hash:8].[ext]',
  },
};

const jsLoad = {
  test: /\.(js|jsx|mjs)$/,
  loader: require.resolve('babel-loader'),
  options: {
    cacheDirectory: true,
  },
  exclude: /(node_modules)/,
};

const fontLoad = {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'static/fonts/[name].[hash:8].[ext]',
      },
    },
  ],
};

const sassLoad = {
  test: /\.s?(a|c)ss$/,
  use: [
    mode.includes('dev') ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
    },
    {
      loader: 'sass-loader',
    },
  ],
};

const fileLoad = {
  exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
  loader: require.resolve('file-loader'),
  options: {
    name: 'static/media/[name].[hash:8].[ext]',
  },
};

module.exports = {
  mode: mode,
  stats: 'errors-only',
  entry: './src/browser/index.js',
  output: {
    path: path.resolve(__dirname, '..', 'src', 'public'),
    filename: 'static/scripts/bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      linter,
      { oneOf: [imgLoad, jsLoad, fontLoad, sassLoad, fileLoad] },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.PRIVATE': JSON.stringify(isPrivate),
      'process.env.BROWSER': 'true',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'public', 'index.html'),
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'static/styles/main.css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: port,
    quiet: true,
    clientLogLevel: 'silent',
    compress: true,
    contentBase: path.resolve(__dirname, '..', 'src', 'public'),
    historyApiFallback: true,
    before: () => {
      console.log(
        colors.bold.white(
          `Server currently listening :\n`
        ) +
        colors.reset.yellow(
          `\nMachine access: http://localhost:${port}\n`
        ) +
        colors.reset.yellow(
          `Network access: http://${ip()}:${port}`
        )
      );

      if (!isLinux && !isWindows) {
        childProcess.execSync('ps cax | grep "Google Chrome"');
        childProcess.execSync(
          `osascript chrome.applescript "${encodeURI(
            `http://localhost:${port}`
          )}"`,
          {
            cwd: path.resolve(__dirname),
            stdio: 'ignore',
          }
        );
      }
    },
  },
};
