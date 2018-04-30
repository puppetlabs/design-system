import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

import app from '.';
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

app
  .use(express.static(paths.dist()))
  .listen(port, () => console.log(`Server listening at port ${port}`));
