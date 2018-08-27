import * as THREE from "../lib/three.module.js";
import { InertialContol } from './inertialControl.js';
import Camera from './camera.js';

class Application {
    
    //container;
    //scene;

    constructor() {
    
        console.info('Application running 3', THREE);
        this.stats = new Stats();
        this.attachContainer();
        this.createScene();
        this.camera = Camera;
        this.attachControl();
        this.clock = new THREE.Clock();

        this.animate();
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
        container.appendChild( this.stats.dom );
        document.body.appendChild( container );   
    }

    createScene() {
        this.scene = new THREE.Scene();
        const renderer = this.renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );

        window.addEventListener( 'resize', () => this.renderer.setSize( window.innerWidth, window.innerHeight ), false );

        this.scene.renderer = renderer;
        this.scene.renderTo = function(camera) {
            this.renderer.render( this.scene, camera );
        }.bind(this);
        this.container.appendChild( this.scene.renderer.domElement );
    }

    attachControl() {
        const controls = this.controls = new InertialContol(this.camera, this.scene.renderer.domElement);
        controls.movementSpeed = 0.1;
        controls.rollSpeed = Math.PI / 3;
        controls.autoForward = false;
        controls.dragToLook = true;
    }

    animate() {
        requestAnimationFrame( this.animate.bind(this) );
    
        const delta = this.clock.getDelta();
    
        this.controls.update( delta );
        this.scene.renderTo(this.camera);
        this.stats.update();
    }
}

export default new Application();