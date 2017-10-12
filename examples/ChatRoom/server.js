// network
import SocketIONetworkServer from './Network/SocketIOClientNetwork';

// network collection
import { NetworkCollection } from 'jellydoodle';

// network components
import { ChatRoom } from './NetworkComponents/ChatRoom';
import { AuthorizationS } from './NetworkComponents/Authorization';

// build network
let network = new SocketIONetworkServer(/* settings */);

// generate some chat rooms
network.mount('Rooms', NetworkCollection({ 
    // type of chat room
    of: ChatRoom, 
    // prevent rooms from being added or removed
    locked: true, 
    // room models
    with: [
        { title: 'Casual' },
        { title: 'Singles' },
        { title: 'Movies and Shows' },
        { title: 'Friends' }
    ]
});

// mount an auth component
network.mount('Auth', new AuthorizationS());

// bring server online network
network.online();
