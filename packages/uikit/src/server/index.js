// const webpack = require('webpack');
// const middleware = require('webpack-dev-middleware');
const express = require('express');

// const webpackConfig = require('../../config/development.webpack.config.js');

// const compiler = webpack(webpackConfig);

const app = express();

// app.use(middleware(compiler, { publicPath: webpackConfig.output.publicPath }));

app.listen(3000, () => console.log('App listening at port 3000'));
