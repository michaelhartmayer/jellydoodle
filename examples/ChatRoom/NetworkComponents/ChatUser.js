import NetworkComponent from '../../../src/NetworkComponent';

class ChatUser extends NetworkComponent {
    public = {
        username: null
    }
}

class ChatUserS extends ChatUser {
    private = {
        admin: false
    }
}

export default {
    ChatUser,
    ChatUserS
}