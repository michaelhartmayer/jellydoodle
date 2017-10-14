class A {
	bla = 'From A()'

	constructor () {
		this.settings = this._init();
	}
	
	_init () {
		return super.init 
			? Object.assign({}, super.init(), this.init()) 
			: Object.assign({}, this.init());
	}
	
	init () {
		return { a: 5 }
	}
}

class B extends A {
	bla = 'From B()'
	
	constructor () {
		super()
        this.settings = this.init();
	}
	
	init () {
		return { 
			events: ['message'],
			state: {
				public: {
					title: this.bla
				}
			}
		};
	}
}

new A();
new B();