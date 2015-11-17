var mongoose = require('mongoose');

var Promise = require('bluebird');
Promise.promisifyAll(mongoose);

process.env.NODE_ENV = 'development';

/**
 * Set URI for MongoDB
 * If it's development, set it to local 'nearby-test'
 * Else, set it to cloud 'staging'; getting uri from mongo.staging or NEARBY_COMPOSE_URI
 */
if (process.env.NODE_ENV == 'development') {
  var MONGO_CONFIG = Config.get('mongo.development');
} else {
  var MONGO_CONFIG = Config.get('mongo.staging') ? Config.get('mongo.staging') : {
    'uri': process.env.NEARBY_COMPOSE_URI,
    'name': 'staging'
  }
}

/**
 * The Mongo Database Helper.
 * @constructor
 */
function MongoDatabaseHelper() {
  /**
   * The URI for the Mongo connection.
   * @type {string}
   */
  this.uri = MONGO_CONFIG.uri || '';
}


/** 
 * When successfully connected log out the connection.
 * @type {!Event}
 */
MongoDatabaseHelper.prototype.buildUri = function() {
  this.uri = this.uri || [
    'mongodb://',
    MONGO_CONFIG.username, ':',
    MONGO_CONFIG.password, '@',
    MONGO_CONFIG.server, ':',
    MONGO_CONFIG.port, '/',
    MONGO_CONFIG.name
  ].join('');
  return this.uri;
}
 
/**
 * Initialize the Mongo database.
 */
mongoose.connect(new MongoDatabaseHelper().buildUri());

/** 
 * When successfully connected log out the connection.
 * @type {!Event}
 */
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to database ' + MONGO_CONFIG.name + '.');
});

/** 
 * Log out the throw when there's a connection error.
 * @type {!Event}
 */
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

/** 
 * When successfully disconnected log out the connection.
 * @type {!Event}
 */
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected.');
});

