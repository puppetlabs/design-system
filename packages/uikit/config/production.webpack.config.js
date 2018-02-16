const commonConfig = require('./common.webpack.config.js');

module.exports = Object.assign(commonConfig, {
  mode: 'production',
});
