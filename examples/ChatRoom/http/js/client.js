'use strict';

var _SocketIOClientNetwork = require('./Network/SocketIOClientNetwork');

var _SocketIOClientNetwork2 = _interopRequireDefault(_SocketIOClientNetwork);

var _ChatRoom = require('./NetworkComponents/ChatRoom');

var _ChatRoom2 = _interopRequireDefault(_ChatRoom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chatRoomClient = new Client();
var chatRoom = new _ChatRoom2.default();

chatRoomServer.registerNetworkComponent('ChatRoom', chatRoom);