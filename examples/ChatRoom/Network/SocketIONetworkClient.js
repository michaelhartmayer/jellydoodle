import Network from '../../../src/Network';

class SocketIONetworkClient extends Network {
    constructor() {
        super(arguments);
        console.client('Starting Client Network..', socket); 
    }

    on (channel, event, message) {

    }

    emit (channel, event, message) {

    }
}

export default SocketIOServerNetworkClient;