const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../config/.env.production'),
});

const express = require('express');
const paths = require('../../config/paths');
const app = require('.');

const port = process.env.PORT || 3000;

app
  .use(express.static(paths.dist()))
  .listen(port, () => console.log(`Server listening at port ${port}`));
