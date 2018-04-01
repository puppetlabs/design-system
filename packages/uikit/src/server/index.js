const express = require('express');
const api = require('./api');

module.exports = express().use('/api', api);
