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
            var thing = settings[setting];

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

                    _this._network.registerRoute(_this, eventName);

                    _this['do' + eventName] = function () {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key];
                        }

                        var _network = _this._network;

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