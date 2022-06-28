const path = require('path');

module.exports = {
  module: {
    rules: [
      { test: /\/LICENSE$/i, use: 'raw-loader' },
    ],
  },
};