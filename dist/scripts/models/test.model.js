import * as THREE from "../../lib/three.module.js";
import MeshLoader from '../meshLoader.js';

export default function () {

    var pinkMat = new THREE.MeshPhongMaterial({
        color: new THREE.Color("rgb(226,35,213)"),
        emissive: new THREE.Color("rgb(255,128,64)"),
        specular: new THREE.Color("rgb(255,155,255)"),
        shininess: 3,
        flatShading: THREE.FlatShading,
        transparent: 1,
        opacity: 1
    });

    var Ico = new THREE.Mesh(new THREE.IcosahedronGeometry(15, 1), pinkMat);
    Ico.rotation.z = 0.5;

    let loader = new MeshLoader(Ico);
    loader.importMesh('./scripts/models/lights.js');

    Ico.destroy = function() {
        loader.destroy();
    }

    return Ico;
}
