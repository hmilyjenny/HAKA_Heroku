var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './client/src/index.js'
  ],
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  module:{
    loader:[
      {
        test: /\.(js|jsx)$/,  //All .js and .jsx files
        loaders: 'babel', //react-hot is like browser sync and babel loads jsx and es6-7
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.css$/,
        loaders:[
          'style-loader?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'sass-loader'
        ]
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)([\?]?.*)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    })
  ],
}
