import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';

import app from './index.mjs';
// eslint-disable-next-line
import webpackConfig from '../../config/development.webpack.config.js';

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
    console.log(`Server listening at http://localhost:${port}\n`);
  });
