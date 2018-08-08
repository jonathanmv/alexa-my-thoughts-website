'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LOGIN_WITH_AMAZON_REDIRECT_URL: '"http://localhost:8080/"',
  USER_POOL_ID: '"us-east-1_d1oxqzK3J"',
  USER_POOL_CLIENT_ID: '"2ipmplpov1351c65brmafe22lo"'
})
