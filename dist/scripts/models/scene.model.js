import * as THREE from "../../lib/three.module.js";
import MeshLoader from '../meshLoader.js';
import Nebula from './nebulaBox.js';

function animate(delta) {
    this.loaders.forEach(l => l.animate(delta));
}

export default class MeshConstructor {

    constructor() {

        this.mesh = new THREE.Group();
    
        this.loaders = [];
        this.loaders.push(new MeshLoader(this.mesh, './scripts/models/lights.js'));
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
