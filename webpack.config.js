var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: ['webpack-hot-middleware/client',
          './client/src/index.js',
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module:{
    loaders:[
      {
        test: /\.jsx*$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel',
        query: {
          presets: ['react-hmre'],
        },
      },
      {
        test: /\.css$/,
        loaders:[
          'style-loader?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'sass'
        ]
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)([\?]?.*)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins:[
   new webpack.HotModuleReplacementPlugin(),
   new webpack.NoErrorsPlugin()
  ],
}
