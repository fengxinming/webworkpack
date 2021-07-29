const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    app: ['./examples/webworker/main.js']
  },
  output: {
    filename: 'output.js',
    path: path.join(__dirname, 'dist'),
    pathinfo: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin()
  ]
};
