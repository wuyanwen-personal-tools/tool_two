const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//提取css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');//压缩css
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/' //上线时配置的是cdn的地址
  },
  module: {
    rules: [
      //{ test: /\.js$/, use: 'es3ify-loader' },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                [require("@babel/plugin-proposal-decorators"), { "legacy": true }]
              ]
            }
          }
        ],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        //use: ['style-loader', 'css-loader'],
        use: [{ loader: MiniCssExtractPlugin.loader}, 'css-loader'],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.less/,
        //use: ['style-loader', 'css-loader', 'less-loader'],
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'less-loader'],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.scss/,
        //use: ['style-loader', 'css-loader', 'sass-loader'],
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.(gif|jpg|png|bmp|eot|woff|woff2|ttf|svg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'images'//如果希望图片存放在单独的目录下，那么需要指定outputPath
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: './dist',
    port: '8080',
    host: 'localhost'
  },
  optimization: {
    // runtimeChunk: { //打包runtime代码
    //   name: 'manifest'
    // },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: true,
          keep_fnames: false,
        },
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ],
    // splitChunks:{  //打包node_modules里的代码
    //   chunks: 'async',
    //   minSize: 30000,
    //   minChunks: 1,
    //   maxAsyncRequests: 5,
    //   maxInitialRequests: 3,
    //   name: false,
    //   cacheGroups: {
    //     vendor: {
    //       name: 'vendor',
    //       chunks: 'initial',
    //       priority: -10,
    //       reuseExistingChunk: false,
    //       test: /node_modules\/(.*)\.js/
    //     },
    //     styles: {
    //       name: 'styles',
    //       test: /\.(scss|css)$/,
    //       chunks: 'all',
    //       minChunks: 1,
    //       reuseExistingChunk: true,
    //       enforce: true
    //     }
    //   }
    // }
  }
};