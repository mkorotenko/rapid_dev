import * as THREE from "../../lib/three.module.js";
import MeshLoader from '../meshLoader.js';
import Nebula from './nebulaBox.js';

function animate(delta) {
    this.loaders.forEach(l => l.animate(delta));
}

export default class MeshConstructor {

    constructor() {

        var scene = this.mesh = new THREE.Group();
    
        //LIGHTS
        var lights = [];
        lights[0] = new THREE.PointLight(0xffffff, 1, 0);
        lights[1] = new THREE.PointLight(0xffffff, 1, 0);
        lights[2] = new THREE.PointLight(0xffffff, 1, 0);

        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(- 100, - 200, - 100);

        scene.add(lights[0]);
        scene.add(lights[1]);
        scene.add(lights[2]);

        this.loaders = [];
        // this.loaders.push(new MeshLoader(this.mesh, './scripts/models/lights.js'));
        this.loaders.push(new MeshLoader(this.mesh, './scripts/models/poi.js'));
    
        Nebula().then(nebula => {
            this.mesh.add(nebula);
        })

        this.animate = animate.bind(this);
    }

    destroy() {
        this.loaders.forEach(element => element.destroy());
    }

}
