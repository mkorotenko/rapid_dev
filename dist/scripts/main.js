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

export class EventEmitter {

    constructor() {
        this.events = {};
    }

    emit(eventName, data) {
        const event = this.events[eventName];
        if (event) 
            event.forEach((fn) => fn.call(null, data));
    }

    subscribe(eventName, fn) {
        if (!this.events[eventName]) 
            this.events[eventName] = [];

        this.events[eventName].push(fn);
        return () => {
            this.events[eventName] = this.events[eventName].filter((eventFn) => fn !== eventFn);
        }
    }

    event(eventName) {
        const single = new EventEmitterSingle();
        // return {
        //     emit: this.emit.bind(this, eventName),
        //     subscribe: this.subscribe.bind(this, eventName)
        // }
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
        this.eventEmitter.emit(`update_${fileName}`);
    }

    moduleRequire(fileName) {
        if (!this.events[fileName]) {
            const event = this.events[fileName] = this.eventEmitter.event(fileName);
            import(fileName).then((module) => {
                 event.emit(module);
            })
            this.eventEmitter.subscribe(`update_${fileName}`, () => {
                import(fileName).then((module) => {
                    event.emit(module);
               })
            })
            return event;
        }
        else
            return this.events[fileName];
        // const event = this.eventEmitter;
        // if (!this.modules[fileName]) {
        //     import(`../${fileName}`).then((module) => {
        //         console.info(`Module ${fileName} loaded`, module);
        //         this.modules[fileName] = module;
        //         event.emit(module);
        //     })
        // }
        // else 
        //     event.emit(this.modules[fileName]);
        //return event;
    }

}
