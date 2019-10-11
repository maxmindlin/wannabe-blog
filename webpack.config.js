const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = path.resolve(__dirname, 'frontend/src');
const distPath = path.resolve(__dirname, 'frontend/dist');

module.exports = (env = {}) => {
  // Base config
  let config = {
    devtool: env.production ? 'source-map' : 'inline-source-map',
    entry: {
      app: `${srcDir}/index.js`
    },
    mode: env.production ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    output: {
      filename: '[name].bundle.js',
      path: distPath,
      publicPath: '/'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new Dotenv(),
      new HtmlWebpackPlugin({
        template: `${srcDir}/index.html`,
        favicon: `${srcDir}/assets/favicon.ico`,
      })
    ],
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom'
      },
      extensions: ['.js', '.jsx']
    }
  };

  // Dev overrides
  if (!env.production) {
    config = {
      ...config,
      devServer: {
        contentBase: distPath,
        hot: true,
        historyApiFallback: true
      }
    };
  }

  // Production overrides
  if (env.production) {
    config = {
      ...config,
      output: {
        ...config.output,
        filename: '[name].[hash].js'
      },
      optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all'
        }
      }
    };
  }

  return config;
};
