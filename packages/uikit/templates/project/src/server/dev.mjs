import dotenv from 'dotenv';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import url from 'url';
import webpack from 'webpack';

import app from './index.mjs';
import expose from './expose';
import webpackConfig from '../../config/development.webpack.config';

/**
 * TODO: replace with import.meta or whatever they come up with
 */
const { __dirname } = expose;
dotenv.config({
  path: path.resolve(__dirname, '../../config/.env.development'),
});

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
    const localUrl = url.format({
      protocol: 'http',
      hostname: 'localhost',
      port,
      pathname: '/',
    });
    console.log(`Server listening at port ${port}`);
    console.log(`You can now view your app in the browser: ${localUrl}\n`);
  });
