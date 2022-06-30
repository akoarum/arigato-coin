const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './frontend/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    fallback: {
      stream: false,
      crypto: false,
      assert: false,
      http: false,
      https: false,
      url: false,
      os: false,
      buffer: require.resolve('buffer'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './frontend/index.html'),
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
}
