import * as THREE from "../lib/three.module.js";

const Camera = function camera() {
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.0000001, 1e7 );
    camera.position.z = 1;
    camera.position.y = 1;
    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

    camera.saveState = saveState.bind(camera);
    camera.readState = readState.bind(camera);

    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'keyup', () => camera.saveState());
    window.addEventListener( 'mouseup', () => camera.saveState());

    return camera;
}()

function onWindowResize() {
    Camera.aspect = window.innerWidth / window.innerHeight;
    Camera.updateProjectionMatrix();
}

function saveState(storageName = 'camera') {
    const position = JSON.stringify(this.position);
    const rotation = JSON.stringify(this.rotation);
    localStorage.setItem(storageName, `{"position":${ position },"rotation":${ rotation }}`);
}

function readState(storageName = 'camera') {
     const set = localStorage.getItem(storageName);
     if (set) {
         const settings = JSON.parse(set);
         var position, rotation;

         position = settings.position;
         this.position.set(position.x, position.y, position.z)

         rotation = settings.rotation;
         this.rotation.set(rotation._x, rotation._y, rotation._z)
     }
}

//a little bit different way of doing it than the player module
export default Camera
