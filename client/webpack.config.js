const path = require('path')

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
        test: /\.(le|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true
            }
          },
          // {
          //   loader: 'typings-for-css-modules-loader',
          //   options: {
          //     modules: true,
          //     namedExport: true
          //   }
          // }
        ]
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
