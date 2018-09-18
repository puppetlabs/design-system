import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import url from 'url';
import webpack from 'webpack';

import app from './index.mjs';
import webpackConfig from '../../config/development.webpack.config';

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
