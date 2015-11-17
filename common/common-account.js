/**
 * @fileoverview The account module.
 * A factory to generate common server errors.
 *
 * @module common/account
 */

var Account = require('../resources/accounts/account');

/**
 * The common Account function.
 * @param {!Object} socket The current socket.
 * @extends {Error}
 * @constructor
 */
function CommonAccount(socket, next) {
  // TODO(vergun): Rather than hardcoding, 
  // get the account here, and attach it to the socket.
  if (socket.account = 'nearby') return next();
  next(CommonError.Account('Account error'));
}


/**
 * Public API
 * @type {Function}
 */
module.exports = CommonAccount;