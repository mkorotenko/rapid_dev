import * as THREE from "../../lib/three.module.js";

export default class LightLoader {

    constructor() {
        var L1 = new THREE.PointLight( 0xffffff, 1);
        L1.position.z = 0;
        L1.position.y = 200;
        L1.position.x = 200;

        this.mesh = L1;
    }

}