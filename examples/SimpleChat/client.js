import SocketIOClientNetwork from './Network/SocketIOClientNetwork';
import SimpleChat            from './NetworkComponents/SimpleChat';

// build client network
const client = new SocketIOClientNetwork();

// instantiate chatroom network component
const chatRoom = new SimpleChat({
    // handle 'message' event
    onMessage: message => {
        document.querySelector('.buffer').innerHTML += `<div>${message}</div>`;
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