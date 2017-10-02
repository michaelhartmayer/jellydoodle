import NetworkComponent from '../../../src/NetworkComponent';

class ChatUser extends NetworkComponent {
    state: {
        public: {
            admin: false
        },
        shared: {
            alias: 'Unknown'
        }
    }

    constructor(settings) {
        super(arguments);
    }
}

export default {
    ChatUser
};