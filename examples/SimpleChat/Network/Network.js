class Network {
    _mounted   = {}
    _resources = {}
    _nodes     = {}
    _routes    = {}

    sendNetworkMessage (ncInstance, packet) {
        const { type } = packet;
        this.emit(type, Object.assign({}, packet, { _nid: ncInstance._nid }));
    }

    registerRoute (ncInstance, eventName) {
        this._routes[ncInstance._nid] = this._routes[ncInstance._nid] || [];
        this._routes[ncInstance._nid].push(eventName);
    }

    routeNetworkMessage (from, packet) {
        // log
        // console.log(packet);

        const { _nid, type, event, data } = packet;

        // route
        switch (type) {
            case 'do':
                // 1: trigger on event on this end
                this.triggerOnEventFor(_nid, event, data);
                // 2: send to all connections
                for (const n in this._nodes)
                    this.emit(this._nodes[n], packet);
                break;
        }
    }

    triggerOnEventFor (nid, event, data) {
        const ncInstance = this._mounted[nid];
        // console.log('triggering', nid, event, ncInstance);

        if (!ncInstance) return;
        if (!ncInstance[`on${event}`]) return;

        ncInstance[`on${event}`].apply(null, data);
    }

    addNetworkNode (id, node) {
        this._nodes[id] = { id, node };
        return this._nodes[id];
    }

    removeNetworkNode (node) {
        this._nodes[node.id] = null;
    }

    getNetworkNode (node) {
        return this._nodes[node.id];
    }

    mount (nid, ncInstance) {
        // generate ncid
        const ncid = `ncid-${0 | Math.random() * 999999999}`;

        // assign network ids
        ncInstance._ncid = ncid;
        ncInstance._nid  = nid;

        // connect
        ncInstance._connectToNetwork(this);

        // mount by resource name
        this._mounted[nid] = ncInstance;

        // reference by resource id
        this._resources[ncid] = ncInstance;

        // log
        console.log('Mounted:', nid, 'as', ncInstance._ncid);
    }

    unmount (ncInstanceOrId) {
    }

    online () {
    }
}

export default Network;