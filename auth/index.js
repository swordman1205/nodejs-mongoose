/**
 * @fileoverview The auth module.
 * A factory to generate auth reused application code.
 *
 * Usage:
 *   var accountParser = require('auth/account-parser')
 *
 *   function (req, res, next){
 *      next(new commonError.Auth('Some custom error message.'))
 *   }
 *
 */

var accountParser = require('./account-parser');
var authRoutes = require('./auth-routes');
var passportStrategies = require('./passport-strategies');
var tokenParser = require('./token-parser');


var mappings = {
  Account: accountParser,
  Passport: passportStrategies,
  Routes: authRoutes,
  Token: tokenParser
}

module.exports = mappings