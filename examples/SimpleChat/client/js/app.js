(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
            // log
            // console.log(packet);

            var _nid = packet._nid,
                type = packet.type,
                event = packet.event,
                data = packet.data;

            // route

            switch (type) {
                case 'do':
                    // 1: trigger on event on this end
                    this.triggerOnEventFor(_nid, event, data);
                    // 2: send to all connections
                    for (var n in this._nodes) {
                        this.emit(this._nodes[n], packet);
                    }break;
            }
        }
    }, {
        key: 'triggerOnEventFor',
        value: function triggerOnEventFor(nid, event, data) {
            var ncInstance = this._mounted[nid];
            // console.log('triggering', nid, event, ncInstance);

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
            // generate ncid
            var ncid = 'ncid-' + (0 | Math.random() * 999999999);

            // assign network ids
            ncInstance._ncid = ncid;
            ncInstance._nid = nid;

            // connect
            ncInstance._connectToNetwork(this);

            // mount by resource name
            this._mounted[nid] = ncInstance;

            // reference by resource id
            this._resources[ncid] = ncInstance;

            // log
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

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Network2 = require('./Network');

var _Network3 = _interopRequireDefault(_Network2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import { Network } from 'jellydoodle';


var SocketIOClientNetwork = function (_Network) {
    _inherits(SocketIOClientNetwork, _Network);

    function SocketIOClientNetwork() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { port: 3000 };

        _classCallCheck(this, SocketIOClientNetwork);

        // settings
        var _this = _possibleConstructorReturn(this, (SocketIOClientNetwork.__proto__ || Object.getPrototypeOf(SocketIOClientNetwork)).call(this, arguments));

        _this.namespace = 'SocketIONetworkMessage';
        _this._settings = settings;

        // setup io
        _this._io = io('localhost:' + _this._settings.port);

        // route incoming traffic
        _this._io.on(_this.namespace, function (data) {
            return _this.routeNetworkMessage(_this._io, data);
        });
        return _this;
    }

    _createClass(SocketIOClientNetwork, [{
        key: 'emit',
        value: function emit(to, packet) {
            this._io.emit(this.namespace, packet);
        }
    }, {
        key: 'online',
        value: function online() {
            this._io.connect();
        }
    }]);

    return SocketIOClientNetwork;
}(_Network3.default);

exports.default = SocketIOClientNetwork;

},{"./Network":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NetworkComponent = function () {
    function NetworkComponent() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, NetworkComponent);

        this.events = [];
        this.public = {};
        this.private = {};
        this.shared = {};
        this.local = {};
        this._ncid = null;
        this._network = null;
        this._maps = {};

        for (var setting in settings) {
            // value
            var thing = settings[setting];

            // if this is a function, wrap it around any existing function
            if (typeof thing === 'function') {
                this[setting] = thing;
            }
        }
    }

    _createClass(NetworkComponent, [{
        key: '_connectToNetwork',
        value: function _connectToNetwork(network) {
            this._network = network;
            this._mapEvents();
        }
    }, {
        key: '_mapEvents',
        value: function _mapEvents() {
            var _this = this;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop = function _loop() {
                    var event = _step.value;

                    var eventName = _this._capitalize(event);

                    // "on" event
                    _this._network.registerRoute(_this, eventName);

                    // "do" event
                    _this['do' + eventName] = function () {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key];
                        }

                        var _network = _this._network;

                        // not connected to network

                        if (!_network) return;

                        _network.sendNetworkMessage(_this, {
                            type: 'do',
                            event: eventName,
                            data: args
                        });
                    };
                };

                for (var _iterator = this.events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: '_capitalize',
        value: function _capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }]);

    return NetworkComponent;
}();

exports.default = NetworkComponent;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _NetworkComponent2 = require('./NetworkComponent');

var _NetworkComponent3 = _interopRequireDefault(_NetworkComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import { NetworkComponent } from 'jellydoodle';


var SimpleChat = function (_NetworkComponent) {
    _inherits(SimpleChat, _NetworkComponent);

    function SimpleChat() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, SimpleChat);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SimpleChat.__proto__ || Object.getPrototypeOf(SimpleChat)).call.apply(_ref, [this].concat(args))), _this), _this.events = ['message'], _temp), _possibleConstructorReturn(_this, _ret);
    }

    return SimpleChat;
}(_NetworkComponent3.default);

exports.default = SimpleChat;

},{"./NetworkComponent":3}],5:[function(require,module,exports){
'use strict';

var _SocketIOClientNetwork = require('./Network/SocketIOClientNetwork');

var _SocketIOClientNetwork2 = _interopRequireDefault(_SocketIOClientNetwork);

var _SimpleChat = require('./NetworkComponents/SimpleChat');

var _SimpleChat2 = _interopRequireDefault(_SimpleChat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// build client network
var client = new _SocketIOClientNetwork2.default();

// instantiate chatroom network component
var chatRoom = new _SimpleChat2.default({
    // handle 'message' event
    onMessage: function onMessage(message) {
        // select
        var el = document.querySelector('.buffer');

        // add messasge
        el.innerHTML += '<div class=\'chat-text\'>' + message + '</div>';

        // auto scroll (arbitrary, dynamic later)
        el.scrollTop = 99999999;
    }
});

// mount chat room
client.mount('ChatRoom', chatRoom);

// bring client online
client.online();

// listen for user messages
document.querySelector('#input').addEventListener('change', function (evt) {
    // send message
    chatRoom.doMessage(evt.target.value);

    // clear box
    evt.target.value = '';
});

},{"./Network/SocketIOClientNetwork":2,"./NetworkComponents/SimpleChat":4}]},{},[5]);
