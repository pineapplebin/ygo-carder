const path = require('path')
const webpack = require('webpack')

const env = process.env.NODE_ENV || 'production'

module.exports = {
  mode: env,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [new webpack.WatchIgnorePlugin([/css\.d\.ts$/])],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },
      {
        test: /\.less$/,
        include: path.join(__dirname, 'src/styles'),
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.module\.less$/,
        exclude: [/node_modules/, path.join(__dirname, 'src/styles')],
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              camelCase: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      { test: /\.(eot|woff|ttf)$/, loader: 'file-loader' }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, '.'),
    compress: true,
    host: '0.0.0.0',
    port: 7799,
    historyApiFallback: true
  }
}
