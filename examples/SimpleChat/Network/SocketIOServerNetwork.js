//import { Network } from 'jellydoodle';
const path    = require('path');
const express = require('express');
const app     = express();
const server  = require('http').createServer(app);
const io      = require('socket.io')(server);

// set path for express
app.use(express.static(path.join(__dirname, '../client')));

class Network {
    constructor () {
        this._mounted = {};
    }

    mount (nid, ncInstance) {
        this._mounted[nid] = ncInstance;
        ncInstance._network = this;

        console.log('Mounted:', nid);
    }

    unmount (ncInstanceOrId) {
        // detect
    }
}

class SocketIOServerNetwork extends Network {
    constructor () {
        super();
        io.on('connection', c => console.log('Connection!'))
    }

    on (message) {

    }

    emit (message, payload) {
        io.emit(message, payload);
    }

    online () {
        server.listen(3000);
    }
}

export default SocketIOServerNetwork;