/**
 * @fileoverview The passport module.
 * Provides all passport specific functions.
 */
var commonError = require('../common/common-error');
var passport = require('passport');


/**
 * Passport local strategy. Used with 'username' and 'password' auth.
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {function()} next - next function
 * @return {function()}
 */
module.exports.local = function(req, res, next) {
  passport.authenticate('local', {session: false}, function(err, user, info) {
    if (err) {
      return next(err);
    }
    req.user = user;
    res.data = user;

    next();
  })(req, res, next);
};

/**
 * Passport bearer strategy. Used with token based auth.
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {function()} next - next function
 * @return {function()}
 */
module.exports.bearer = function(req, res, next) {
  // Authenticate using HTTP Bearer credentials, with session support disabled.
  passport.authenticate('bearer', {session: false}, function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new commonError.Auth());
    }
    req.user = user;
    if (info && info.accessToken) {
      req.accessToken = info.accessToken;
    }
    next();
  })(req, res, next);
};
