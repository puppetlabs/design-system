const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../config/.env.production'),
});

const middleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../../config/development.webpack.config.js');
const app = require('.');

const compiler = webpack(webpackConfig);

app
  .use(middleware(compiler, { publicPath: webpackConfig.output.publicPath }))
  .listen(3000, () => console.log('App listening at port 3000'));
