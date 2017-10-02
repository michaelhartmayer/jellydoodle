// network
import SocketIONetworkClient from './Network/SocketIOClientNetwork';

// network components
import ChatRoom from './NetworkComponents/ChatRoom';

// build network
const chatRoomClient = new Client();
/* config */const chatRoom = new ChatRoom();

// hook up chat room to network
chatRoomServer.registerNetworkComponent('ChatRoom', chatRoom);
