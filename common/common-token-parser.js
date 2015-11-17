/**
 * @fileoverview The token parser module.
 * A factory to generate common server errors.
 *
 * @module common/token-parser
 */

var Token = require('../resources/tokens/token');
var CommonError = require('./common-error');

/**
 * The common Account function.
 * @param {!Object} socket The current socket.
 * @extends {Error}
 * @constructor
 */
function CommonTokenParser(socket, next, token) {
  Token.findOne({token: token}).then(function(err, token) {
    if (!token) {
      return next(CommonError.Token());
    }
    socket.accessToken = token;
    socket.user = token.user;
    next();
  });
}


/**
 * Public API
 * @type {Function}
 */
module.exports = CommonTokenParser;