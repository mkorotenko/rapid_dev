import * as THREE from "../../lib/three.module.js";

function getBoundingBoxes(group) {
    let result = group.children.map(m => m.geometry.boundingBox);

    return result;
}

export default class PoiLoader {

    constructor() {

        var group = new THREE.Group();

        var wireframe = new THREE.WireframeGeometry( new THREE.BoxBufferGeometry( 20, 20, 20 ) );
        var line = new THREE.LineSegments( wireframe );
        line.material.depthTest = false;
        line.material.opacity = 0.25;
        line.material.transparent = true;
        line.geometry.computeBoundingBox();
        group.add( line );

        var wf = new THREE.WireframeGeometry( new THREE.SphereBufferGeometry( 2, 10, 10 ) );
        var sphere = new THREE.LineSegments( wf );
        sphere.material.depthTest = false;
        sphere.material.opacity = 0.25;
        sphere.material.transparent = true;
        sphere.geometry.computeBoundingBox();
        group.add( sphere );

        console.info('boxes', getBoundingBoxes(group));

        this.mesh = group;
    }


}