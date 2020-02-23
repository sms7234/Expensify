const path = require('path');

module.exports = (env) => {
  const isProduction = env ==='production';
  return {
    entry: ['./src/index.js'],
    output: {
      path: path.resolve(__dirname, 'Public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react'],
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread'
            ]
          }
        }
      },
      {
        test:/\.s?css$/,
        //exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }]
    },
    devtool: isProduction ? 'source-map':'cheap-module-evalsource-map',
    devServer: {
      contentBase: path.join(__dirname, 'Public'),
      publicPath: '/Public/',
      watchOptions: {
        poll: true
      }
    }
  };
};
