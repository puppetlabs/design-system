const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../config/.env.production'),
});

const express = require('express');
const paths = require('../../config/paths');
const app = require('.');

app
  .use(express.static(paths.dist()))
  .get('*', (req, res) => res.send('index.html'))
  .listen(3000, () => console.log('App listening at port 3000'));
