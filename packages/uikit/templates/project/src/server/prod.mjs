import express from 'express';

import app from './index.mjs';
// eslint-disable-next-line
import paths from '../../config/paths.js';

const port = process.env.PORT || 3000;

app.use(express.static(paths.dist())).listen(port, () => {
  console.log(`Server listening at http://localhost:${port}\n`);
});
