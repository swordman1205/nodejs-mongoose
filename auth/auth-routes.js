/**
 * @fileoverview The auth Routes module.
 * A factory to generate auth reused application code.
 *
 * Usage:
 *   var accountParser = require('auth/account-parser')
 *
 *   function (req, res, next){
 *      next(new commonError.Auth('Some custom error message.'))
 *   }
 */


 /**
 * The Express Router.
 * @type {express.Router}
 */
var express = require('express');
var passport = require('passport');
var authPassport = require('../auth/passport');
var userController = require('../resources/users/user-controller');
var routes = express.Router();
var errorController = require('../resources/errors/error-controller');

/**
 * User Routes.
 */
routes.route('/login').post(authPassport.local, userController.login);
routes.route('/signup').post(userController.signup);
routes.route('/users/forgot').post(userController.forgotPassword);
routes.route('/users/reset').post(userController.passwordReset);
routes.route('/Error').post(errorController.GenericError);


/**
 * Up display route.
 */
routes.route('/up').get(function(req, res, next) {
  var env = process.env.NODE_ENV || 'Dev';
  res.end('Nearby API ' + env + ' Server is operational!');
});


/**
 * Export the routes module.
 */
module.exports = routes;