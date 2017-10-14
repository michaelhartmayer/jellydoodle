class NetworkComponent {
    events  = []
    public  = {}
    private = {}
    shared  = {}
    local   = {}

    _ncid     = null
    _network  = null
    _maps     = {}

    constructor (settings = {}) {
        for (const setting in settings) {
            // value
            const thing = settings[setting];

            // if this is a function, wrap it around any existing function
            if (typeof(thing) === 'function') {
                this[setting] = thing;
            }
        }
    }

    _connectToNetwork (network) {
        this._network = network;
        this._mapEvents();
    }

    _mapEvents () {
        for (const event of this.events) {
            const eventName = this._capitalize(event);

            // "on" event
            this._network.registerRoute(this, eventName);

            // "do" event
            this[`do${eventName}`] = (...args) => {
                const { _network } = this;

                // not connected to network
                if (!_network) return;

                _network.sendNetworkMessage(this, {
                    type:  'do',
                    event: eventName,
                    data:  args
                });
            }
        }
    }

    _capitalize (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

export default NetworkComponent;