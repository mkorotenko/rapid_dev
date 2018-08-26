import * as THREE from "../lib/three.module.js";
import { InertialContol } from './inertialControl.js';
import Camera from './camera.js';

const stats = new Stats();
class Application {
    
    //container;
    //scene;

    constructor() {
    
        console.info('Application running 3', THREE);
        this.attachContainer();
        this.createScene();
        this.camera = Camera;
        this.attachControl();

    }

    unload() {
        this.container.remove();
        console.info('Application unload 3');
    }

    attachContainer() {
        if (document.getElementById('webgl'))
            document.getElementById('webgl').remove();

        let container = this.container = document.createElement( 'div' );
        container.id='webgl';
        container.appendChild( stats.dom );
        document.body.appendChild( container );   
    }

    createScene() {
        this.scene = new THREE.Scene();
        const renderer = this.renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );

        window.addEventListener( 'resize', () => this.renderer.setSize( window.innerWidth, window.innerHeight ), false );

        this.scene.renderer = renderer;
        this.container.appendChild( this.scene.renderer.domElement );
    }

    attachControl() {
        const controls = this.controls = new InertialContol(this.camera, this.scene.renderer.domElement);
        controls.movementSpeed = 0.1;
        //controls.domElement = scene.renderer.domElement;
        controls.rollSpeed = Math.PI / 3;
        controls.autoForward = false;
        controls.dragToLook = true;
    }

    animate() {
        requestAnimationFrame( this.animate );
    
        const delta = clock.getDelta();
    
        this.controls.update( delta );
        scene.renderTo(camera);
        stats.update();
    }
}

export default new Application();