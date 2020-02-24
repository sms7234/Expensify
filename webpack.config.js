const path = require('path');
const ExtractTextPlugin = require('mini-css-extract-plugin')

module.exports = (env) => {
  const isProduction = env ==='production';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'Public/scripts'),
      filename: 'bundle.js'
    },
    plugins:[
      new ExtractTextPlugin({
        filename: 'styles.css'
      })
    ],
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: [
          {
            loader: ExtractTextPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }]
    },
    devtool: isProduction ? 'source-map':'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'Public'),
      publicPath: '/scripts',
      historyApiFallback: true,
      watchOptions: {
        poll: true
      }
    }
  };
};
