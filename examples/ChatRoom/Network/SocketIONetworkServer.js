import Network from '../../../src/Network';

// Setup basic express server
const express = require('express');
const app     = express();
const path    = require('path');
const server  = require('http').createServer(app);
const io      = require('socket.io')(server);
const port    = process.env.PORT || 3000;

class SocketIONetworkServer extends Network {
    constructor () {
        super(arguments);
    }

    online (fn) {

    }
}

export default SocketIONetworkServer;