const path = require("path");
const process = require("process");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const Critters = require("critters-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const OptimizeCSS = require("optimize-css-assets-webpack-plugin");
const eslintFormatter = require("react-dev-utils/eslintFormatter");
const TerserPlugin = require("terser-webpack-plugin");

const isPrivate = process.env.PRIVATE || false;

if (!process.env.NODE_ENV) process.env.NODE_ENV = "production";
const mode = process.env.NODE_ENV;

const linter = {
  test: /\.(js|jsx|mjs)$/,
  enforce: "pre",
  use: [
    {
      options: {
        formatter: eslintFormatter,
        eslintPath: require.resolve("eslint")
      },
      loader: require.resolve("eslint-loader")
    }
  ],
  include: path.resolve(__dirname, "src")
};

const imgLoad = {
  test: /\.(gif|png|jpe?g)$/i,
  loader: require.resolve("url-loader"),
  options: {
    limit: 10000,
    name: "static/media/[name].[hash:8].[ext]"
  }
};

const jsLoad = {
  test: /\.(js|jsx|mjs)$/,
  loader: require.resolve("babel-loader"),
  options: {
    cacheDirectory: true
  },
  exclude: /(node_modules)/
};

const sassLoad = {
  test: /\.s?(a|c)ss$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: require.resolve("css-loader")
    },
    {
      loader: require.resolve("postcss-loader"),
      options: {
        autoprefixer: {
          browsers: ["last 2 versions"]
        },
        plugins: () => [autoprefixer]
      }
    },
    {
      loader: require.resolve("sass-loader"),
      options: {}
    }
  ]
};

const fileLoad = {
  exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
  loader: require.resolve("file-loader"),
  options: {
    name: "static/media/[name].[hash:8].[ext]"
  }
};

const browserOptimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      parallel: true
    })
  ]
};

const serverOptimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      parallel: true
    })
  ]
};

const aliases = {
  // 'react': 'preact-compat',
  // 'react-dom': 'preact-compat',
};

const browserConfig = {
  mode: mode,
  stats: "errors-only",
  entry: "./src/browser/index.js",
  target: "web",
  name: "browser",
  optimization: browserOptimization,
  resolve: {
    alias: aliases
  },
  output: {
    path: path.resolve(__dirname, "..", "build"),
    filename: "static/scripts/bundle.[hash:8].js",
    publicPath: "/"
  },
  module: {
    rules: [linter, { oneOf: [imgLoad, jsLoad, sassLoad, fileLoad] }]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(mode),
      "process.env.PRIVATE": JSON.stringify(isPrivate),
      "process.env.BROWSER": "true"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "..", "src", "public", "**/*"),
        to: path.resolve(__dirname, "..", "build"),
        ignore: ["index.html"],
        flatten: true
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.resolve("src", "public", "index.html"),
      filename: path.resolve("build", "templates", "index.html"),
      minify: true
    }),
    new MiniCssExtractPlugin({
      filename: "static/styles/main.[hash:8].css"
    }),
    new Critters({
      preload: "js-lazy",
      logLevel: "silent",
      pruneSource: false,
      minify: true
    }),
    new CompressionPlugin({
      minRatio: 1,
      exclude: /^(favicon|apple|android|safari|mstile).*/,
      test: /\.(jpe?g|png|gif|js|css|svg)$/,
      deleteOriginalAssets: true
    })
  ].filter(Boolean)
};

const serverConfig = {
  mode: mode,
  stats: "errors-only",
  entry: "./src/server/index.js",
  target: "node",
  name: "server",
  optimization: serverOptimization,
  resolve: {
    alias: aliases
  },
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "..", "build"),
    filename: "server.js",
    publicPath: "/"
  },
  module: {
    rules: [linter, { oneOf: [imgLoad, jsLoad, sassLoad, fileLoad] }]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(mode),
      "process.env.PRIVATE": JSON.stringify(isPrivate),
      "process.env.BROWSER": "false"
    }),
    new MiniCssExtractPlugin({
      filename: "static/styles/main.[hash:8].css"
    }),
    new CompressionPlugin({
      minRatio: 1,
      exclude: /^(favicon|apple|android|safari|mstile).*/,
      test: /\.(jpe?g|png|gif|css|svg)$/,
      deleteOriginalAssets: true
    })
  ].filter(Boolean)
};

module.exports = [browserConfig, serverConfig];
