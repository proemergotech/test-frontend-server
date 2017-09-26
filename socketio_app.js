
var socketIo = require('socket.io');

const CHAT_USER = 'buddy';

var msgdb = [
  toMsg(CHAT_USER, "what's up?"),
];

module.exports = function(server) {

  /*
  var options = {
    transports: [
      'websocket',
      'flashsocket',
      'htmlfile',
      'xhr-polling',
      'jsonp-polling',
      'polling'
    ]
  };
  */

  var io = socketIo(server);

  // Socket.io
  io.on('connection', function(socket) {

    // Welcome
    socket.emit('message', toMsg(CHAT_USER, 'Welcome candidate!'));

    // Incomming message
    socket.on('message', function(data) {

      var msg = filterMessage(data);

      socket.emit('message', toMsg(CHAT_USER, 'You said: ' + msg.message));

    });

  });

  setInterval(function(){

    io.emit('message', randomMsg(msgdb));

  }, 25 * 1000);

  return io;
}

function randomMsg(db) {
  return db[Math.floor(Math.random() * db.length)];
}

function toMsg(user, message) {
  return {
    user: user,
    message: message
  };
}

function filterMessage(msg) {
  var def = {
    user: null,
    message: null,
  };
  return Object.assign({}, def, msg);
}
