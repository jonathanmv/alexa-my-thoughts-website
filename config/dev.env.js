'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LOGIN_WITH_AMAZON_REDIRECT_URL: '"http://localhost:8080/"'
  // BACKEND_URL: '"http://localhost:8081/api"'
})
