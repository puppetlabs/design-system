const express = require('express');
const ping = require('./ping');

const api = express.Router().get('/ping', ping);

module.exports = api;
