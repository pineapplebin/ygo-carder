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
        use: ['ts-loader']
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true
            }
          }
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
    port: 7799
  }
}
