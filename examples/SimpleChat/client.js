import SocketIOClientNetwork from './Network/SocketIOClientNetwork';
import SimpleChat            from './NetworkComponents/SimpleChat';

// build client network
const client = new SocketIOClientNetwork();

// instantiate chatroom network component
const chatRoom = new SimpleChat({
    // handle 'message' event
    onMessage: message => {
        // select
        const el = document.querySelector('.buffer')

        // add messasge
        el.innerHTML += `<div class='chat-text'>${message}</div>`;

        // auto scroll (arbitrary, dynamic later)
        el.scrollTop = 99999999;
    }
});

// mount chat room
client.mount('ChatRoom', chatRoom);

// bring client online
client.online();

// listen for user messages
document.querySelector('#input').addEventListener('change', evt => {
    // send message
    chatRoom.doMessage(evt.target.value);

    // clear box
    evt.target.value = '';
});