import dotenv from 'dotenv';
import middleware from 'webpack-dev-middleware';
import path from 'path';
import webpack from 'webpack';

import app from './index.mjs';
import expose from './expose';
import webpackConfig from '../../config/development.webpack.config';

/**
 * TODO: replace with import.meta or whatever they come up with
 */
const { __dirname } = expose;
dotenv.config({
  path: path.resolve(__dirname, '../../config/.env.production'),
});

const port = process.env.PORT || 3000;
const compiler = webpack(webpackConfig);

app
  .use(
    middleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: webpackConfig.stats,
    }),
  )
  .listen(port, () => console.log(`Server listening at port ${port}`));
