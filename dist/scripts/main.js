import * as THREE from "../lib/three.module.js";
import MeshLoader from './meshLoader.js';
import InertialContol from './inertialControl.js';
import Camera from './camera.js';
import EventEmitter from './eventEmitter.js';

class Application {
    
    constructor() {
    
        this.onRender = new EventEmitter();

        this.render = this.render.bind(this);

        this.clock = new THREE.Clock();

        this.createStatistic();

        this.createCamera();

        this.createRenderer();
        
        this.attachControl();

        this.scene = new THREE.Scene();

        this.loader = new MeshLoader(this.scene, './scripts/models/scene.model.js');

        this.onRender.subscribe(delta => this.loader.animate(delta));

        //FINISH
        this.render();

    }
    
    unload() {
        // this.container.remove();
        this.loader.destroy();
        console.info('Application unload');
    }

    render() {

        requestAnimationFrame( this.render );

        this.onRender.emit(this.clock.getDelta());
        this.renderer.render(this.scene, this.camera);

    };

    createStatistic() {

        this.stats = new Stats();

        if (document.getElementById('webgl'))
            document.getElementById('webgl').remove();

        let container = document.createElement( 'div' );
        container.id='webgl';
        container.appendChild( this.stats.dom );
        document.body.appendChild( container );

        this.onRender.subscribe(() => this.stats.update())
    }

    createCamera() {
    //     this.camera = Camera;//new THREE.PerspectiveCamera(80,1,0.1,10000);
    //     this.scene.add(this.camera);
    //     this.camera.readState();
    //     //this.camera.position.z = 50;
        var camera = this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );
        camera.position.z = 30;

        window.addEventListener( 'resize', function () {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

        }, false );
    }

    createRenderer() {
        var renderer = this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0x000000, 1 );
        document.body.appendChild( renderer.domElement );

        window.addEventListener( 'resize', function () {
            renderer.setSize( window.innerWidth, window.innerHeight );
        }, false );
    }

    attachControl() {
        const controls = this.controls = new InertialContol(this.camera, this.renderer.domElement);
        controls.movementSpeed = 5;
        controls.rollSpeed = Math.PI / 3;
        controls.autoForward = false;
        controls.dragToLook = true;

        this.onRender.subscribe((delta) => {
            this.controls.update(delta);
        })
    }

}

export default new Application();