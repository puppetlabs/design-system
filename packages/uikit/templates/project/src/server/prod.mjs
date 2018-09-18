import express from 'express';
import url from 'url';

import app from './index.mjs';
import paths from '../../config/paths';

const port = process.env.PORT || 3000;

app.use(express.static(paths.dist())).listen(port, () => {
  const localUrl = url.format({
    protocol: 'http',
    hostname: 'localhost',
    port,
    pathname: '/',
  });
  console.log(`Server listening at port ${port}`);
  console.log(`You can now view your app in the browser: ${localUrl}\n`);
});
