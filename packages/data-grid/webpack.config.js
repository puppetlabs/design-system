const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const paths = {
  root: path.resolve(__dirname),
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

module.exports = env => ({
  entry: path.resolve(paths.src, 'index.js'),
  mode: env && env.development ? 'development' : 'production',
  target: 'node',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: paths.root }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  stats: {
    modules: false,
    children: false,
  },
  output: {
    filename: 'index.js',
    library: {
      name: 'data-grid',
      type: 'umd',
    },
    path: paths.dist,
    publicPath: './',
  },
  externals: [
    nodeExternals({ modulesDir: path.resolve(__dirname, '../node_modules') }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[hash:base64:5]',
              camelCase: true,
            },
          },
          'postcss-loader',
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 2 },
          },
          'postcss-loader',
          'resolve-url-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        exclude: [/\.(js|jsx|mjs|html|json|scss)$/],
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[hash].[ext]',
        },
      },
    ],
  },
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.mjs', '.jsx'],
  },
});
