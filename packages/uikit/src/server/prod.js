const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../config/.env.production'),
});

const app = require('.');

app.listen(3000, () => console.log('App listening at port 3000'));
