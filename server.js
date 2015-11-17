'use strict';

var config = require('config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var nodeStatic = require('node-static')
var http = require('http');
var port = process.env.PORT || config.get('server.port');
var _ = require('lodash');
var Auth = require('./auth');
var Common = require('./common');

var mode, uptime;


server.listen(port);

app.use(express.static(__dirname + '/dist/public/'))

app.use(bodyParser.text({
    inflate: true,
    defaultCharset: 'utf-8',
    type: 'text/plain' }));
app.use(Auth.Routes);

server.listen(port);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/dist/public/index.html');
});

_.extend(global, {
  CommonError: Common.Error,
  Config: config,
  Constants: Common.Constants,
  Moment: require('moment'),
  CurrentUsers: new Object()
});

io.serveClient(true);
io.use(Auth.Account);
io.use(Auth.Token);
io.on('connection', function(socket) {
  var namespace = io.of(socket.account);
  namespace.use(Common.RouteBuilder);
});

io.on('disconnect', function(socket) {
  delete CurrentUsers[socket.id];
})

require('./database/mongo');

uptime = Moment().format('MMMM Do YYYY, h:mm:ss a');

