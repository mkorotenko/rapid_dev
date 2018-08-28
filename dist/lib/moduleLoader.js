class EventEmitterSingle {

    constructor () {
        this.eventName = 'default';
        this.events = {};
        this.data = null;
    }

    emit(data) {
        const event = this.events[this.eventName];
        this.data = data;
        if (event) 
            event.forEach((fn) => fn.call(null, this.data));
    }

    subscribe(fn) {
        if (!this.events[this.eventName]) 
            this.events[this.eventName] = [];

        this.events[this.eventName].push(fn);
        if (this.data !== null)
            fn.call(null, this.data);
        return () => {
            this.events[this.eventName] = this.events[this.eventName].filter((eventFn) => fn !== eventFn);
        }
    }

    unsubscribe() {
        this.events[this.eventName] = undefined;
    }

}

class EventEmitter {

    constructor() {
        this.events = {};
    }

    emit(eventName, data) {
        const event = this.events[eventName];
        if (event) 
            event.forEach((fn) => fn.call(null, data));
    }

    subscribe(eventName, fn, unsubscribe) {
        if (!this.events[eventName]) 
            this.events[eventName] = [];

        this.events[eventName].push(fn);
        return () => {
            if (unsubscribe)
                unsubscribe();
            this.events[eventName] = this.events[eventName].filter((eventFn) => fn !== eventFn);
        }
    }

    hasEvent(eventName) {
        const event = this.events[eventName];
        return !!event;
    }

    event(eventName) {
        const single = new EventEmitterSingle();

        this.subscribe(eventName, (data) => {
            single.emit(data);
        })
        return single;
    }

    unsubscribe(eventName) {
        this.events[eventName] = undefined;
    }

}

export class Loader {

    constructor() {
        this.modules = {};
        this.events = {};
        this.eventEmitter = new EventEmitter();
    }

    updateModule(fileName) {
        const eventName = `update_${fileName}`;
        if (this.eventEmitter.hasEvent(`update_${fileName}`)) {
            this.eventEmitter.emit(eventName);
            return true;
        }
        else
            return false;
    }

    moduleRequire(fileName) {
        if (!this.events[fileName]) {
            const event = this.events[fileName] = this.eventEmitter.event(fileName);
            var _module;
            import(`../${fileName}`).then((module) => {
                _module = module;
                event.emit(module);
            })
            this.eventEmitter.subscribe(`update_${fileName}`, () => {
                if (_module.unload) 
                    _module.unload();
                else if (_module.default && _module.default.unload)
                    _module.default.unload();

                import(`../${fileName}?rand=${Math.random()}`).then((module) => {
                    _module = module;
                    event.emit(module);
               })
            })
            return event;
        }
        else
            return this.events[fileName];

    }

}
