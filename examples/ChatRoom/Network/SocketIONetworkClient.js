import Network from '../../../src/Network';

class SocketIONetworkClient extends Network {
    components: [
        ChatRoom,
        ChatUser
    ]
}

export default SocketIOServerNetworkClient;

const notify = nwChatUser => console.log(nwChatUser)

ChatUser.map()