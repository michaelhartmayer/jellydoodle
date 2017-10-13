//import { Network } from 'jellydoodle';

class Network {
    mount () {
        
    }

    handshake () {
        console.log('HandShake!')
    }
}

class SocketIOClientNetwork extends Network {
    online () {
        const s = io('localhost');
        s.on('connect', this.handshake());
    }
}

export default SocketIOClientNetwork;