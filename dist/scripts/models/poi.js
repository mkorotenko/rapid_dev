import * as THREE from "../../lib/three.module.js";

export default class PoiLoader {

    constructor() {

        var pinkMat = new THREE.MeshPhongMaterial({
            color: new THREE.Color("rgb(206,35,213)"),
            emissive: new THREE.Color("rgb(55,28,34)"),
            specular: new THREE.Color("rgb(255,155,155)"),
            shininess: 3,
            flatShading: THREE.FlatShading,
            transparent: true,
            opacity: 1
        });
    
        this.mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(25, 5), pinkMat);;

    }


}