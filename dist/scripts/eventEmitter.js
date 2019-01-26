export default class EventEmitter {

    constructor() {
        this.eventName = 'default';

        this.events = {};
    }

    emit(data) {
        const event = this.events[this.eventName];
        if (event) 
            event.forEach((fn) => fn.call(null, data));
    }

    subscribe(fn) {
        if (!this.events[this.eventName]) 
            this.events[this.eventName] = [];

        this.events[this.eventName].push(fn);
        return () => {
            this.events[this.eventName] = this.events[this.eventName]
            .filter((eventFn) => fn !== eventFn);
        }
    }

    unsubscribe() {
        this.events[this.eventName] = undefined;
    }

}

// class EventEmitter1 {

//     public events: {
//         [key: string]: any;
//     } = {};

//     public emit(eventName: string, data: any) {
//         const event = this.events[eventName];
//         if (event) 
//             event.forEach((fn: any) => fn.call(null, data));
//     }

//     public subscribe(eventName: string, fn: any) {
//         if (!this.events[eventName]) 
//             this.events[eventName] = [];

//         this.events[eventName].push(fn);
//         return () => {
//             this.events[eventName] = this.events[eventName].filter((eventFn: any) => fn !== eventFn);
//         }
//     }

//     public unsubscribe(eventName: string) {
//         this.events[eventName] = undefined;
//     }

// }
