
/**
 * The common Route Builder.
 * Builds event listeners for each incoming connection.
 * @param {!Object} socket The current socket.
 * @extends {Error}
 * @constructor
 */

var account = require('../resources/accounts/account-controller');
var channel = require('../resources/channels/channel-controller');
var conversation = require('../resources/conversations/conversation-controller');
var loc = require('../resources/locations/location-controller');
var message = require('../resources/messages/message-controller');
var user = require('../resources/users/user-controller');

/**
 * Binds all user common routes post authentication.
 * @param {!Socket} socket The current socketIO socket.
 * @param {function()} next The next function to execute.
 */
function CommonRouteBuilder(s, next) {
  var evt = Constants.Events;
  // TODO(vergun): Determine why multiple request handlers are being added –
  //   it seems event driven the listeners need to be removed on every req,
  //   due to uknown which socket will complete its binding execution last.
  delete s._events;
  s.on(evt.ACCOUNTS_CREATE, account.create.bind(account, s));
  s.on(evt.ACCOUNTS_FETCH, account.fetch.bind(account, s));
  s.on(evt.ACCOUNTS_UPDATE, account.update.bind(account, s));
  s.on(evt.ACCOUNTS_DESTROY, account.destroy.bind(account, s));
  s.on(evt.CHANNELS_CREATE, channel.create.bind(account, s));
  s.on(evt.CHANNELS_LIST, channel.list.bind(channel, s));
  s.on(evt.CHANNELS_UPDATE, channel.update.bind(channel, s));
  s.on(evt.CHANNELS_DESTROY, channel.destroy.bind(channel, s));
  s.on(evt.CONVERSATIONS_CREATE, conversation.create.bind(conversation, s));
  s.on(evt.CONVERSATIONS_LIST, conversation.list.bind(conversation, s));
  s.on(evt.CHANNELS_UPDATE, conversation.update.bind(conversation, s));
  s.on(evt.CHANNELS_DESTROY, conversation.destroy.bind(conversation, s));
  s.on(evt.LOCATIONS_CREATE, loc.create.bind(loc, s));
  s.on(evt.LOCATIONS_FETCH, loc.fetch.bind(loc, s));
  s.on(evt.LOCATIONS_UPDATE, loc.update.bind(loc, s));
  s.on(evt.LOCATIONS_DESTROY, loc.destroy.bind(loc, s));
  s.on(evt.MESSAGES_CREATE, message.create.bind(message, s));
  s.on(evt.MESSAGES_LIST, message.list.bind(message, s));
  s.on(evt.MESSAGES_UPDATE, message.update.bind(message, s));
  s.on(evt.MESSAGES_DESTROY, message.destroy.bind(message, s));
  s.on(evt.USERS_CREATE, user.create.bind(user, s));
  s.on(evt.USERS_LIST, user.list.bind(user, s));
  s.on(evt.USERS_LOGOUT, user.logout.bind(user, s));
  s.on(evt.USERS_UPDATE, user.update.bind(user, s));
  s.on(evt.USERS_DESTROY, user.destroy.bind(user, s));
  s.on(evt.USERS_CONTACTS_LIST, user.listContacts.bind(user, s));
  s.on(evt.USERS_CONTACTS_ADD, user.addContact.bind(user, s));
  s.on(evt.USERS_CONTACTS_REMOVE, user.removeContact.bind(user, s));
  return next();
}

/**
 * Public API
 * @type {Function}
 */
module.exports = CommonRouteBuilder;
