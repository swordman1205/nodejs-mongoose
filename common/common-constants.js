/**
 * @fileoverview The constants module.
 * A factory to store reused server constants.
 *
 * Usage:
 *   var Constants = require('common/common-constants')
 *   
 *   ...
 *    socket.emit(Constants.Events.ACCOUNTS_CREATE)
 *
 * @module common/common-constants
 */

/**
 * Endpoint events for resources.
 * @enum {string}
 */
var Events = {
  ACCOUNTS_CREATE: 'accounts:create',
  ACCOUNTS_FETCH: 'accounts:fetch',
  ACCOUNTS_UPDATE: 'accounts:update',
  ACCOUNTS_DESTROY: 'accounts:destroy',
  CHANNELS_CREATE: 'channels:create',
  CHANNELS_JOIN: 'channels:join',
  CHANNELS_LIST: 'channels:list',
  CHANNELS_UPDATE: 'channels:update',
  CHANNELS_DESTROY: 'channels:destroy',
  CONVERSATIONS_CREATE: 'conversations:create',
  CONVERSATIONS_LIST: 'conversations:list',
  CONVERSATIONS_UPDATE: 'conversations:update',
  CONVERSATIONS_DESTROY: 'conversations:destroy',
  LOCATIONS_CREATE: 'locations:create',
  LOCATIONS_FETCH: 'locations:fetch',
  LOCATIONS_UPDATE: 'locations:update',
  LOCATIONS_DESTROY: 'locations:destroy',
  MESSAGES_CREATE: 'messages:create',
  MESSAGES_LIST: 'messages:list',
  MESSAGES_UPDATE: 'messages:update',
  MESSAGES_DESTROY: 'messages:destroy',
  USERS_CREATE: 'users:create',
  USERS_LIST: 'users:list',
  USERS_LOGIN: 'users:login',
  USERS_LOGOUT: 'users:logout',
  USERS_UPDATE: 'users:update',
  USERS_DESTROY: 'users:destroy',
  USERS_CONTACTS_LIST: 'users:contacts:list',
  USERS_CONTACTS_ADD: 'users:contacts:add',
  USERS_CONTACTS_REMOVE: 'users:contacts:remove'
}

/**
 * Endpoint events for resources.
 * @enum {string}
 */
var Errors = {
  ACCOUNTS: 'accounts:error',
  CHANNELS: 'channels:error',
  CONVERSATIONS: 'conversations:error',
  LOCATIONS: 'locations:error',
  MESSAGES: 'messages:error',
  USERS: 'users:error'
}

/**
 * Endpoint events for resources.
 * @enum {string}
 */
var Tokens = {
  COOKIE_MAX_AGE: 90 * 24 * 3600 * 1000, // 90 days
}

/**
 * Types used in Transaction operations.
 * @enum {string}
 * @const
 */
var Transaction_TYPES = {
  INSERT: 'insert',
  UPDATE: 'update',
  REMOVE: 'remove'
}

/**
 * Freezes the object.
 * @const {Object}
 */
var CONSTANTS = Object.freeze({
  Events: Events,
  Errors: Errors,
  Tokens: Tokens,
  TransactionTypes: Transaction_TYPES
})

/**
 * Public API
 * @type {!Object}
 */
module.exports = CONSTANTS;
