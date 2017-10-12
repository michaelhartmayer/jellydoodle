import SocketIOServerNetwork from './Network/SocketIOServerNetwork';
import SimpleChat            from './NetworkComponents/SimpleChat';

// build server network
const server = new SocketIOServerNetwork();

// mount chat room
server.mount('ChatRoom', new SimpleChat());

// bring server online
server.online();