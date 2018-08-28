import * as THREE from "../../lib/three.module.js";
import MeshLoader from '../meshLoader.js';
import Nebula from './nebulaBox.js';

export default class MeshConstructor {

    constructor() {
        var pinkMat = new THREE.MeshPhongMaterial({
            color: new THREE.Color("rgb(206,35,213)"),
            emissive: new THREE.Color("rgb(255,128,64)"),
            specular: new THREE.Color("rgb(255,155,255)"),
            shininess: 3,
            flatShading: THREE.FlatShading,
            transparent: 1,
            opacity: 1
        });
    
        var Ico = new THREE.Mesh(new THREE.IcosahedronGeometry(15, 1), pinkMat);
        Ico.rotation.z = 0.5;
    
        this.loaders = [];
        this.loaders.push(new MeshLoader(Ico, './scripts/models/lights.js'));
    
        this.mesh = Ico;

        Nebula().then(nebula => {
            this.mesh.add(nebula);
        })
    }

    destroy() {
        this.loaders.forEach(element => element.destroy());
    }
}
