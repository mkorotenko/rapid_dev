import * as THREE from "../lib/three.module.js";

const stats = new Stats();
class Application {
    constructor() {
        console.info('Application running 3', THREE);
        this.attachContainer();
    }

    unload() {
        let container;
        if (container = document.getElementById('webgl'))
            container.remove();
        console.info('Application unload 3');
    }

    attachContainer() {
        let container;
        if (container = document.getElementById('webgl'))
            container.remove();

        container = document.createElement( 'div' );
        container.id='webgl';
        container.appendChild( stats.dom );
        document.body.appendChild( container );
        
    }
}

export default new Application();