import * as THREE from "../lib/three.module.js";
import { InertialContol } from './inertialControl.js';

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

        this.importMesh('./scripts/models/lights.js');
        this.importMesh('./scripts/models/test.model.js');

        console.info('Scene', this.scene);

    }
    

    unload() {
        this.container.remove();
        Object.keys(this.subscriptions).forEach(k => this.subscriptions[k]());
        console.info('Application unload');
    }

    importMesh(meshModule) {
        if (this.subscriptions[meshModule])
            this.subscriptions[meshModule]();
        let meshID;
        this.subscriptions[meshModule] = module(meshModule)
            .subscribe((Mesh) => {
                console.info(`Mesh ready ${meshModule}`, Mesh);
                let prevMesh;
                if (prevMesh = this.scene.children.find(m => m.uuid === meshID))
                    this.scene.remove(prevMesh);

                let mesh = Mesh.default();
                meshID = mesh.uuid;
                this.scene.add(mesh);
            });
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
        this.camera = new THREE.PerspectiveCamera(80,1,0.1,10000);
        this.scene.add(this.camera);
        this.camera.position.z = 50;
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