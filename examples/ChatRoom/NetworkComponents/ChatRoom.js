class ChatRoom extends NetworkComponent {
    events = ['userJoined', 'userLeft', 'message']

    public = {
        title: 'Chat Room',
        userCount: 0
    }

    mount = {
        users: NetworkContainer({ 
            of:       ChatUser,
            max:      10,
            onAdd:    this.chatUserJoined,
            onRemove: this.chatUserLeft
        })
    }

    chatUserJoined ({ countainer, item }) {
        // update view: item.alias + has joined
    }

    chatUserLeft ({ countainer, item }) {
        // update view: item.alias + has left
    }

    join (ncUser) {
        return this.mountToUsers(ncUser);
    }

    onMessage ({ user, message }) {
        // update view: user.alias + message
    }
}

class ChatRoomS extends ChatRoom {
}

export default {
    ChatRoom,
    ChatRoomS
}
