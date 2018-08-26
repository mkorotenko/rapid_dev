class Application {
    constructor() {
        console.info('Application running 2');
    }

    unload() {
        console.info('Application unload 2');
    }
}

export default new Application();