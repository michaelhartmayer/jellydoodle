// import { NetworkComponent } from 'jellydoodle';

class NetworkComponent {
    events = []

    constructor () {
        this._generateDynamicEvents();
    }

    _capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    _generateDynamicEvents () {
        for (let event of this.events) {
            this[`on${this._capitalizeFirstLetter(event)}`] = _ => {};
            this[`do${this._capitalizeFirstLetter(event)}`] = _ => {};
        }
    }
}

class SimpleChat extends NetworkComponent {
    events = ['message']
}

export default SimpleChat;