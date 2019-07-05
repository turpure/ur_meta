var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://58.246.226.254:8089/v1"'
  BAtSE_API: '"http://127.0.0.1:8089/v1"'
})
