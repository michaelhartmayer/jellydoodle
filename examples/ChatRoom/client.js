// network
import SocketIONetworkClient from './Network/SocketIOClientNetwork';

// network collection
import { NetworkCollection } from 'jellydoodle';

// network components
import { ChatRoom, ChatUser } from './NetworkComponents/ChatRoom';
import { Authorization }      from './NetworkComponents/Authorization';

// build network
let network = new SocketIONetworkClient(/* settings */);

// generate some chat rooms
network.mount('Rooms', NetworkCollection({ of: ChatRoom });

// mount an auth component
network.mount('Auth', new Authorization());

// bring server online network
network.online();
