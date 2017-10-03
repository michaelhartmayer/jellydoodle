import NetworkComponent from '../../../src/NetworkComponent';

class ChatRoom extends NetworkComponent {
    name = 'Lobby'

    state: {
        public: {
            title: '',
            users: []
        }
    }

    events: {
        'say':    ['alias', 'message'],
        'join':   null,
        'leave':  null,
        'notify': ['message']
    }

    onSay (from, { alias, message }) {
        // update view: alias, message
    }

    didUpdatePublicState () {
        // update view: title, users
    }
}

class ChatRoomServer extends NetworkComponent {
    users = []

    onSay (from, { message }) {
        let user = from.findNetworkComponent('User');
        this.doSay({ alias: user.alias, message });
    }

    onJoin (from) {
        let user = from.findNetworkComponent('User');
        this.users.push(user);
        this.updateUsers();

        // notify channel
        this.doNotify({ message: `${user.alias} has joined.` });
    }

    onLeave (from) {
        let user = from.findNetworkComponent('User');
        this.users = this.users.filter(_ => _ !== user);
        this.updateUsers();

        // notify channel
        this.doNotify({ message: `${user.alias} has left.` });
    }

    willUpdatePublicTitle (from) {
        let user = from.findNetworkComponent('User');

        // not an admin, don't allow change
        if (!user.isAdmin()) return false;
    }

    updateUsers () {
        let users = this.users.map(_ => { alias: _.alias });
        this.setPublicState({ users });
    }
}

export default { ChatRoom, ChatRoomServer };