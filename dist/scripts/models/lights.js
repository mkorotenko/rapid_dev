import * as THREE from "../../lib/three.module.js";

export default function () {

    var L1 = new THREE.PointLight( 0xffffff, 1);
    L1.position.z = 100;
    L1.position.y = 100;
    L1.position.x = 100;

    return L1;
}