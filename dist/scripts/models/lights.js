import * as THREE from "../../lib/three.module.js";

export default class LightLoader {

    constructor() {

        var L1 = new THREE.PointLight( 0xffffff, 1);
        L1.position.z = 100;
        L1.position.y = 50;
        L1.position.x = 100;

        // let A1 = new THREE.AmbientLight( 0xcccccc, 2 );

        const group = new THREE.Group();

        group.add(L1);
        // group.add(A1);

        this.mesh = group;

    }

}