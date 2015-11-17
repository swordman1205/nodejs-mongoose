/**
 * @fileoverview The error module.
 * A factory to generate common server errors.
 *
 * Usage:
 *   var commonError = require('common/error')
 *
 *   function (req, res, next){
 *      next(new commonError.Auth('Some custom error message.'))
 *   }
 *
 * @module common/error
 */


/**
 * The common Account Error (401).
 * @param {string=} opt_message The optional message.
 * @extends {Error}
 * @constructor
 */
function AccountError(opt_message) {
  this.name = 'AuthError';
  this.message = (opt_message || 'You must be from a valid account.');
}
AccountError.prototype = Object.create(Error.prototype);


/** @type {!AuthError} */
AccountError.prototype.constructor = AuthError;

/**
 * The common Unauthorized Error (401).
 * @param {string=} opt_message The optional message.
 * @extends {Error}
 * @constructor
 */
function AuthError(opt_message) {
  this.name = 'AuthError';
  this.message = (opt_message || 'You must login first.');
}
AuthError.prototype = Object.create(Error.prototype);


/** @type {!AuthError} */
AuthError.prototype.constructor = AuthError;


/**
 * The common Missing Required Attributes Error.
 * @param {string=} opt_message The optional message.
 * @extends {Error}
 * @constructor
 */
function MissingRequiredAttributes(opt_message) {
  this.name = 'MissingRequiredAttributes';
  this.message = (opt_message || 'Required attributes missing from req.');
}
MissingRequiredAttributes.prototype = Object.create(Error.prototype);


/** @type {!MissingRequiredAttributes} */
MissingRequiredAttributes.prototype.constructor = MissingRequiredAttributes;


/**
 * The common Unauthorized Error.
 * @param {string=} opt_message The optional message.
 * @extends {Error}
 * @constructor
 */
function TokenError(opt_message) {
  this.name = 'TokenError';
  this.message = (opt_message || 'Invalid or expired token, try logging in.');
}
TokenError.prototype = Object.create(Error.prototype);


/** @type {!AuthError} */
TokenError.prototype.constructor = TokenError;


/**
 * The common Missing Collection Error.
 * @param {string=} opt_message The optional message.
 * @extends {Error}
 * @constructor
 */
function MissingCollectionError(opt_message){
  this.name = 'MissingCollectionError';
  this.message = (opt_message || 'Collection not found.');
}
MissingCollectionError.prototype = Object.create(Error.prototype);


/** @type {!MissingCollectionError} */
MissingCollectionError.prototype.constructor = MissingCollectionError;

/**
 * Public API
 * @type {Object}
 */
module.exports = {
  Account: AccountError,
  Attributes: MissingRequiredAttributes,
  Auth: AuthError,
  Token: TokenError,
  Transaction: MissingCollectionError
}