import Network from './Network';

const path    = require('path');
const express = require('express');
const app     = express();
const server  = require('http').createServer(app);
const io      = require('socket.io')(server);

// set path for express
app.use(express.static(path.join(__dirname, '../client')));

class SocketIOServerNetwork extends Network {
    namespace = 'SocketIONetworkMessage'

    constructor (settings = { port: 3000 }) {
        super(arguments);

        // store settings
        this._settings = settings;

        // add-remove as node
        io.on('connection', sck => {
            // node
            const node = this.addNetworkNode(sck.id, sck);

            // handle network message
            sck.on(this.namespace, packet => this.routeNetworkMessage(node, packet));

            // handle disconnect
            sck.on('disconnect', _ => this.removeNetworkNode(node));
        });
    }

    emit (to, packet) {
        if (!to) { console.error('ERROR: emit() failed.', packet); return; }
        to.node.emit(this.namespace, packet);
    }

    online () {
        // super 
        super.online();

        // listen
        server.listen(this._settings.port);

        // log
        console.log('> Listening on Port ' + this._settings.port);
    }
}

export default SocketIOServerNetwork;