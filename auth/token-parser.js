/**
 * @fileoverview The token parser module.
 * A factory to generate common server errors.
 *
 * @module common/token-parser
 */

var Token = require('../resources/tokens/token');
var CommonError = require('../common/common-error');

/**
 * The common Account function.
 * @param {!Object} socket The current socket.
 * @extends {Error}
 * @constructor
 */
function CommonTokenParser(socket, next) {
  var authToken = socket.handshake.query.authToken;
  var userInformation;
  Token.findOne({token: authToken}).populate('user').exec().then(
      function(foundToken, err) {
    if (!foundToken) {
      return next(CommonError.Token());
    }

    userInformation = {
      accessToken: foundToken.token,
      user: foundToken.user.toJSON()}
    CurrentUsers[socket.id] = userInformation;

    next();
  });
}


/**
 * Public API
 * @type {Function}
 */
module.exports = CommonTokenParser;