import * as THREE from "../lib/three.module.js";
import MeshLoader from './meshLoader.js';
import InertialContol from './inertialControl.js';
import Camera from './camera.js';

class Application {
    
    constructor() {
    
        console.info('Application running');

        this.subscriptions = {};

        this.stats = new Stats();
        this.clock = new THREE.Clock();

        this.attachContainer();
        this.attachScene();
        this.attachCamera();
        this.attachControl();

        this.animate();

        this.loader = new MeshLoader(this.scene, './scripts/models/scene.model.js');

        console.info('Scene', this.scene);

    }
    
    unload() {
        this.container.remove();
        this.loader.destroy();
        console.info('Application unload');
    }

    attachContainer() {
        if (document.getElementById('webgl'))
            document.getElementById('webgl').remove();

        let container = this.container = document.createElement( 'div' );
        container.id='webgl';
        container.appendChild( this.stats.dom );
        document.body.appendChild( container );   
    }

    attachCamera() {
        this.camera = Camera;//new THREE.PerspectiveCamera(80,1,0.1,10000);
        this.scene.add(this.camera);
        this.camera.readState();
        //this.camera.position.z = 50;
    }

    attachScene() {
        this.scene = new THREE.Scene();
        const renderer = this.renderer = new THREE.WebGLRenderer();

        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );

        window.addEventListener( 'resize', () => renderer.setSize( window.innerWidth, window.innerHeight ), false );

        this.scene.renderer = renderer;
        this.scene.renderTo = function(camera) {
            this.renderer.render( this.scene, camera );
        }.bind(this);
        this.container.appendChild( this.scene.renderer.domElement );

        window.scene = this.scene;
    }

    attachControl() {
        const controls = this.controls = new InertialContol(this.camera, this.scene.renderer.domElement);
        controls.movementSpeed = 5;
        controls.rollSpeed = Math.PI / 3;
        controls.autoForward = false;
        controls.dragToLook = true;
    }

    animate() {
        requestAnimationFrame( this.animate.bind(this) );
    
        const delta = this.clock.getDelta();
    
        this.controls.update(delta);
        if (this.loader)
            this.loader.animate(delta);
        this.scene.renderTo(this.camera);
        this.stats.update();
    }
}

export default new Application();