var webpack = require('webpack')

module.exports = {
  entry: [
    // client side webpack dev server library
    'webpack-dev-server/client?http://localhost:8080',
    // webpack hot module loader
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  // module and resolve enables loading of JSX files (as opposed to just .js)
  module: {
    // pre v4 rules was known as loaders
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    // enable hot loader
    hot: true
  },
  // load hot loader
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}