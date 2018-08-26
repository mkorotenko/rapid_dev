class Application {
    constructor() {
        console.info('Application running 1');
    }

    unload() {
        console.info('Application unload 1');
    }
}

export default new Application();