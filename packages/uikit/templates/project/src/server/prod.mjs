import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import url from 'url';

import app from './index.mjs';
import expose from './expose';
import paths from '../../config/paths';

/**
 * TODO: replace with import.meta or whatever they come up with
 */
const { __dirname } = expose;
dotenv.config({
  path: path.resolve(__dirname, '../../config/.env.production'),
});

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
