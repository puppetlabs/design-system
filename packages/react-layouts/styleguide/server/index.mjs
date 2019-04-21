import express from 'express';
import historyFallback from 'connect-history-api-fallback';

import api from './api/index.mjs';

const server = express()
  .use('/api', api)
  .use(historyFallback());

export default server;
