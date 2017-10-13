(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import { NetworkComponent } from 'jellydoodle';

var NetworkComponent = function () {
    function NetworkComponent() {
        _classCallCheck(this, NetworkComponent);

        this.events = [];

        this._generateDynamicEvents();
    }

    _createClass(NetworkComponent, [{
        key: '_capitalizeFirstLetter',
        value: function _capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }, {
        key: '_generateDynamicEvents',
        value: function _generateDynamicEvents() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var event = _step.value;

                    this['on' + this._capitalizeFirstLetter(event)] = function (_) {};
                    this['do' + this._capitalizeFirstLetter(event)] = function (_) {};
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
    }]);

    return NetworkComponent;
}();

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
}(NetworkComponent);

exports.default = SimpleChat;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import { Network } from 'jellydoodle';

var Network = function () {
    function Network() {
        _classCallCheck(this, Network);
    }

    _createClass(Network, [{
        key: 'mount',
        value: function mount() {}
    }, {
        key: 'handshake',
        value: function handshake() {
            console.log('HandShake!');
        }
    }]);

    return Network;
}();

var SocketIOClientNetwork = function (_Network) {
    _inherits(SocketIOClientNetwork, _Network);

    function SocketIOClientNetwork() {
        _classCallCheck(this, SocketIOClientNetwork);

        return _possibleConstructorReturn(this, (SocketIOClientNetwork.__proto__ || Object.getPrototypeOf(SocketIOClientNetwork)).apply(this, arguments));
    }

    _createClass(SocketIOClientNetwork, [{
        key: 'online',
        value: function online() {
            var s = io('localhost');
            s.on('connect', this.handshake());
        }
    }]);

    return SocketIOClientNetwork;
}(Network);

exports.default = SocketIOClientNetwork;

},{}],3:[function(require,module,exports){
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
        document.querySelector('.buffer').innerHTML += '<div>' + message + '</div>';
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

},{"./Network/SocketIOClientNetwork":2,"./NetworkComponents/SimpleChat":1}]},{},[3]);
