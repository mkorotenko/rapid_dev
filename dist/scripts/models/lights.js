import * as THREE from "../../lib/three.module.js";

export default class LightLoader {

    constructor() {

        var L1 = new THREE.PointLight( 0xffffff, 1);
        L1.position.z = 0;
        L1.position.y = 200;
        L1.position.x = 200;

        // let A1 = new THREE.AmbientLight( 0xcccccc, 2 );

        const group = new THREE.Group();

        group.add(L1);
        // group.add(A1);

        this.mesh = group;


    }

}