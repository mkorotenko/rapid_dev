import * as THREE from "../../lib/three.module.js";
import MeshLoader from '../meshLoader.js';
import Nebula from './nebulaBox.js';

export default class MeshConstructor {

    constructor() {

        this.mesh = new THREE.Group();
    
        this.loaders = [];
        this.loaders.push(new MeshLoader(this.mesh, './scripts/models/lights.js'));
        this.loaders.push(new MeshLoader(this.mesh, './scripts/models/poi.js'));
    
        Nebula().then(nebula => {
            this.mesh.add(nebula);
        })

    }

    destroy() {
        this.loaders.forEach(element => element.destroy());
    }
}
