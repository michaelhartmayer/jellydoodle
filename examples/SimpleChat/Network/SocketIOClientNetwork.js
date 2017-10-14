//import { Network } from 'jellydoodle';
import Network from './Network';

class SocketIOClientNetwork extends Network {
    namespace = 'SocketIONetworkMessage'

    constructor (settings = { port: 3000 }) {
        super(arguments);

        // settings
        this._settings = settings;

        // setup io
        this._io = io(`localhost:${this._settings.port}`);

        // route incoming traffic
        this._io.on(this.namespace, data => this.routeNetworkMessage(this._io, data));
    }

    emit (to, packet) {
        this._io.emit(this.namespace, packet);
    }

    online () {
        this._io.connect();
    }
}

export default SocketIOClientNetwork;