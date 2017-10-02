class NetworkComponent {
    _ncid: 0

    constructor () {
        this._ncid = this._guid();
    }

    is (nwc) {
        return nwc._ncid === this._ncid;
    }

    isNot ({ ncid }) {
        return !this.is(ncid);
    }

    _guid () {
        return '0000-0000-0000-0000';
    }
}

// registered singleton stored components
NetworkComponent._components = {};

// get a component
NetworkComponent.as = ncid => NetworkComponent._components[ncid];

// export
export default NetworkComponent;