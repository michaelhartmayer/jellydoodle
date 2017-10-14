'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Network = function () {
    function Network() {
        _classCallCheck(this, Network);

        this._mounted = {};
        this._resources = {};
        this._nodes = {};
        this._routes = {};
    }

    _createClass(Network, [{
        key: 'sendNetworkMessage',
        value: function sendNetworkMessage(ncInstance, packet) {
            var type = packet.type;

            this.emit(type, Object.assign({}, packet, { _nid: ncInstance._nid }));
        }
    }, {
        key: 'registerRoute',
        value: function registerRoute(ncInstance, eventName) {
            this._routes[ncInstance._nid] = this._routes[ncInstance._nid] || [];
            this._routes[ncInstance._nid].push(eventName);
        }
    }, {
        key: 'routeNetworkMessage',
        value: function routeNetworkMessage(from, packet) {
            var _nid = packet._nid,
                type = packet.type,
                event = packet.event,
                data = packet.data;

            switch (type) {
                case 'do':
                    this.triggerOnEventFor(_nid, event, data);

                    for (var n in this._nodes) {
                        this.emit(this._nodes[n], packet);
                    }break;
            }
        }
    }, {
        key: 'triggerOnEventFor',
        value: function triggerOnEventFor(nid, event, data) {
            var ncInstance = this._mounted[nid];


            if (!ncInstance) return;
            if (!ncInstance['on' + event]) return;

            ncInstance['on' + event].apply(null, data);
        }
    }, {
        key: 'addNetworkNode',
        value: function addNetworkNode(id, node) {
            this._nodes[id] = { id: id, node: node };
            return this._nodes[id];
        }
    }, {
        key: 'removeNetworkNode',
        value: function removeNetworkNode(node) {
            this._nodes[node.id] = null;
        }
    }, {
        key: 'getNetworkNode',
        value: function getNetworkNode(node) {
            return this._nodes[node.id];
        }
    }, {
        key: 'mount',
        value: function mount(nid, ncInstance) {
            var ncid = 'ncid-' + (0 | Math.random() * 999999999);

            ncInstance._ncid = ncid;
            ncInstance._nid = nid;

            ncInstance._connectToNetwork(this);

            this._mounted[nid] = ncInstance;

            this._resources[ncid] = ncInstance;

            console.log('Mounted:', nid, 'as', ncInstance._ncid);
        }
    }, {
        key: 'unmount',
        value: function unmount(ncInstanceOrId) {}
    }, {
        key: 'online',
        value: function online() {}
    }]);

    return Network;
}();

exports.default = Network;