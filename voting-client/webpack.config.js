var webpack = require('webpack')
// for production: extracts css into separate file
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var CleanWebPackPlugin = require('clean-webpack-plugin')
var HtmlWebPackPlgin = require('html-webpack-plugin')

var isDevelopment = process.env.NODE_ENV !== 'production'


module.exports = {
  mode: isDevelopment? 'development' : 'production',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  module: {
    rules: [
      // #1 core JS loader for React/JSX files
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // #2 html loader to mount index.html root file
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: !isDevelopment }
          }
        ]
      },
      // #3 style loaders for scss stylesheets
      {
        test: /\.s(a|c)ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              camelCase: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      // #4 generic file loader for fonts
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.scss']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: isDevelopment ? '[name].js' : '[name].[hash].js'
  },
  devServer: {
    contentBase: './dist',
    // enable hot loader
    hot: true
  },
  // load hot loader
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    }),
    new HtmlWebPackPlgin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new CleanWebPackPlugin()
  ]
}