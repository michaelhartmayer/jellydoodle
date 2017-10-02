'use strict';

var _SocketIONetworkServer = require('./Network/SocketIONetworkServer');

var _SocketIONetworkServer2 = _interopRequireDefault(_SocketIONetworkServer);

var _ChatRoom = require('./NetworkComponents/ChatRoom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// build network
// network
var chatRoomServer = new _SocketIONetworkServer2.default();

// network components

var chatRoom = new _ChatRoom.ChatRoomServer();

// hook up chat room to network
chatRoomServer.registerNetworkComponent('ChatRoom', chatRoom);

// start server
chatRoomServer.online(function (_) {
  return console.log('ChatRoom Online!');
});