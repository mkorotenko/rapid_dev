import * as THREE from "../../lib/three.module.js";

export default class PoiLoader {

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
    
        var Ico = new THREE.Mesh(new THREE.IcosahedronGeometry(25, 1), pinkMat);
        Ico.rotation.z = 0.5;

        this.mesh = Ico;

    }

}