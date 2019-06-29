import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';

import app from './index.mjs';
import webpackConfig from '../../config/development.webpack.config.js'; //eslint-disable-line

const port = process.env.PORT || 3000;
const compiler = webpack(webpackConfig);

app
  .use(
    devMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: webpackConfig.stats,
    }),
  )
  .use(hotMiddleware(compiler, { reload: true }))
  .listen(port, () => {
    console.log(`Server listening at port ${port}`);
  });
