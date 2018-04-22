const express = require('express');
const historyFallback = require('connect-history-api-fallback');
const api = require('./api');

module.exports = express()
  .use(historyFallback())
  .use('/api', api);
