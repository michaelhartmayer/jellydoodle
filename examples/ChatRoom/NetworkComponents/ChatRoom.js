import NetworkComponent from '../../../src/NetworkComponent';

// server-side state
const chatRoomStateServer = {
    private: {
        admins: []
    }
};

/* Client */
class ChatRoom extends NetworkComponent {
    state = {
        public: {
            userCount: 0,
            userNames: [],
            buffer:    []
        },
        shared: {
            title: 'Room Title'
        },
        events: {
            say: {
                from:    NetworkComponentType.NetworkComponent,
                message: NetworkComponentType.HTMLSafeText
            }
        }
    }

    willUpdatePublicUserNames (ncid, ) {
        // update views
    }

    sendMessage (user, message) {
        this.doSay(user, message);
    }
}

/* Server */
class ChatRoomServer extends NetworkComponent {
    users         = []
    channelStuard = null

    constructor () {
        super(arguments);

        // generate a channel stuart who can announce things to the channel
        this.channelStuard = new ChatUser({
            alias: 'Channel',
            admin: true
        });
    }

    announce (message) {
        this.doSay(this.channelStuard._ncid, message);
    }

    updateUsers () {
        this.setPublicState({
            userNames: users.map(user => ChatUser(user).name),
            userCount: users.length
        });
    }

    // generated method, from events.say
    onSay (from, message) {
        // add the message to the buffer
        this.setPublicState({
            buffer: [...buffer, {
                from: ChatUser.as(from).name,
                message
            }]
        });
    }
}

export default {
    ChatRoom,
    ChatRoomServer: ChatRoomServer.withState(chatRoomStateServer)
};