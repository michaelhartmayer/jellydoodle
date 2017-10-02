// network
import SocketIONetworkServer from './Network/SocketIONetworkServer';

// network components
import { ChatRoomServer } from './NetworkComponents/ChatRoom';

// build network
const chatRoomServer = new SocketIONetworkServer(/* config */);
const chatRoom       = new ChatRoomServer();

// hook up chat room to network
chatRoomServer.registerNetworkComponent('ChatRoom', chatRoom);

// start server
chatRoomServer.online(_ => console.log('ChatRoom Online!'));