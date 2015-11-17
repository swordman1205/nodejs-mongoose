/**
 * @fileoverview The common module.
 * A factory to generate common reused application code.
 *
 * Usage:
 *   var commonError = require('common/error')
 *
 *   function (req, res, next){
 *      next(new commonError.Auth('Some custom error message.'))
 *   }
 *
 */

var commonAccount = require('./common-account');
var commonConstants = require('./common-constants');
var commonError = require('./common-error');
var commonRouteBuilder = require('./common-route-builder');


var mappings = {
  Constants: commonConstants,
  Error: commonError,
  RouteBuilder: commonRouteBuilder,
}

module.exports = mappings