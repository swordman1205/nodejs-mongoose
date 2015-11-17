/**
 * @fileoverview The passport strategies module.
 * Provides all passport strategies functions.
 */
var passport = require('passport');
var Promise = require('bluebird');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../resources/users/user');
var Token = require('../resources/tokens/token');
var commonError = require('../common/common-error');


/**
 * Passport local strategy. Used with 'username' and 'password' auth.
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {function()} next - next function
 * @return {function()}
 */
passport.use(new LocalStrategy(
    {usernameField: 'email', passReqToCallback: true},
    function(req, email, password, done) {
      if (!email || !password) {
        return done(new commonError.Attributes());
      }
      User.findOne({email: email}).then(function(user) {
        if (!user) return Promise.reject(new commonError.Account());
        if (user && !user.validPassword(password)) {
          return new commonError.Auth('Access credentials are incorrect.');
        }
        done(null, user);

      }).catch(function(err) { done(err); });
    }));


/**
 * Passport bearer strategy. Used with token based auth.
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {function()} next - next function
 * @return {function()}
 */
passport.use(
    new BearerStrategy(
        function(accessToken, done) {
          var hashedToken = Token.hashToken(accessToken);
          Token.findOne({ token: hashedToken},
              function(err, token) {
                if (err) {
                  return done(new commonError.Auth());
                }
                if (!token || !token.user) {
                  return done(new commonError.Auth());
                }
                var userId = token.user;

                User.findById(userId, function(userFetchError, foundUser) {
                  if (userFetchError) {
                    return done(new commonError.Auth());
                  }

                  if (!foundUser) {
                    return done(new commonError.Auth());
                  }

                  done(null, foundUser, {accessToken: token});
                });
              }
          );
        }
    )
);
