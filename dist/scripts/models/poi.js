import * as THREE from "../../lib/three.module.js";

function getBoundingBoxes(group) {
    let result = group.children.map(m => m.geometry.boundingBox);

    return result;
}

function sphereBoundingBox(sphere) {
    let result = {};
    console.info('sphereBoundingBox', sphere);
    let bb = sphere.geometry.boundingBox;
    if (!bb) {
        sphere.geometry.computeBoundingBox();
        bb = sphere.geometry.boundingBox;
    }
    //Vector3 {x: -0, y: 2.200000047683716, z: 0}
    //node.matrixWorld
    result.min = bb.min.applyMatrix4(sphere.matrixWorld);
    result.max = bb.max.applyMatrix4(sphere.matrixWorld);
    return result;
}

export default class PoiLoader {

    constructor() {

        var group = new THREE.Group();

        var wf = new THREE.WireframeGeometry( new THREE.SphereBufferGeometry( 2, 10, 10 ) );
        var sphere = new THREE.LineSegments( wf );
        sphere.material.depthTest = false;
        sphere.material.opacity = 0.25;
        sphere.material.transparent = true;
        //sphere.geometry.computeBoundingBox();
        group.add( sphere );

        var wf1 = new THREE.WireframeGeometry( new THREE.SphereBufferGeometry( 2.2, 10, 10 ) );
        var sphere1 = new THREE.LineSegments( wf1 );
        sphere1.material.depthTest = false;
        sphere1.material.opacity = 0.25;
        sphere1.material.transparent = true;
        sphere1.position.x = 3;
        sphere1.position.y = 4.5;
        //sphere1.geometry.computeBoundingBox();
        group.add( sphere1 );

        //console.info('group', group);
        let boundings = [];//getBoundingBoxes(group);

        var wireframe = new THREE.WireframeGeometry( new THREE.BoxBufferGeometry( 20, 20, 20 ) );
        var line = new THREE.LineSegments( wireframe );
        line.material.depthTest = false;
        line.material.opacity = 0.25;
        line.material.transparent = true;
        //line.geometry.computeBoundingBox();
        group.add( line );

        var helper = new THREE.BoxHelper(sphere, 0xff0000);
        helper.update();
        group.add(helper);
        //helper.geometry.computeBoundingBox();
        boundings.push(sphereBoundingBox(sphere));

        var helper1 = new THREE.BoxHelper(sphere1, 0x0ff000);
        helper1.update();
        group.add(helper1);
        //helper1.geometry.computeBoundingBox();
        boundings.push(sphereBoundingBox(sphere1));

        //console.info('helpers', helper, helper1);

        setTimeout(() => this.createTree(boundings));

        this.mesh = group;
    }

    createTree(boundings) {
        console.info('createTree', boundings);
        let nodes = boundings.map(b => {
            return {
                spatialIndex: -1,
                extents: [
                    b.min.x,
                    b.min.y,
                    b.min.z,
                    b.max.x,
                    b.max.y,
                    b.max.z
                ]
            }
        });

        //     return boxes.map(function(b) {
        //       return {
        //           spatialIndex: -1,
        //           extents: b
        //       };
        //     })

        var aabbTree = AABBTree.create(false); // passing 'true' would use a much slower building strategy
        var n = nodes.length
        console.info('nodes', nodes);
         for(var i=0; i<n; ++i) {
             var node = nodes[i];
             aabbTree.add(node, node.extents);
         }
         aabbTree.finalize();
         console.info('aabbTree', aabbTree);
         let l = [];
         aabbTree.getOverlappingPairs(l, 0)

         console.info('OverlappingPairs', l);
         // return (aabbTree.getOverlappingPairs([], 0) >>> 1);
    }

}