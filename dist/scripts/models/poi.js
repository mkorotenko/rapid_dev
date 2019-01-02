import * as THREE from "../../lib/three.module.js";

function getBoundingBox(boundingBox, position) {
    return [
        boundingBox.min.x + position.x,
        boundingBox.min.y + position.y,
        boundingBox.min.z + position.z,
        boundingBox.max.x + position.x,
        boundingBox.max.y + position.y,
        boundingBox.max.z + position.z
    ]
}

function createSphere(r, x,y,z,col) {

    var sg = new THREE.SphereBufferGeometry( r, 10, 10 );
    var wf = new THREE.WireframeGeometry( sg );

    var sphere = new THREE.LineSegments( wf );
    sphere.material.depthTest = false;
    sphere.material.opacity = 0.25;
    sphere.material.transparent = true;
    sphere.position.x = x||0;
    sphere.position.y = y||0;
    sphere.position.z = z||0;

    var helper = new THREE.BoxHelper(sphere, col);
    helper.update();
    sphere.userData.box = helper;

    sphere.updateBBox = function() {
        if (!sphere.boundingBox)
            sphere.boundingBox = [];
        let bb = sphere.boundingBox;
        let _bb = getBoundingBox(sphere.geometry.boundingBox, sphere.position);
        if (sphere.aabbNode && sphere.aabbNode.AABBTree) {
            sphere.aabbNode.AABBTree.update(sphere.aabbNode, _bb);
        } else {
            bb[0] = _bb[0];
            bb[1] = _bb[1];
            bb[2] = _bb[2];
            bb[3] = _bb[3];
            bb[4] = _bb[4];
            bb[5] = _bb[5];
        }
    }

    sphere.getBBox = function() {
        if (!sphere.geometry.boundingBox) {
            sphere.geometry.computeBoundingBox();
        }
        sphere.updateBBox();
        var b = sphere.boundingBox;
        return sphere.aabbNode = {
            spatialIndex: -1,
            extents: b
        }
    }

    sphere.updatePosition = function(x,y,z) {
        sphere.position.x += x || 0;
        sphere.position.y += y || 0;
        sphere.position.z += z || 0;

        sphere.userData.box.update();

        sphere.updateBBox();
    }

    return sphere;
}

// passing 'true' would use a much slower building strategy
var aabbTree = AABBTree.create(false);

function createTree(boundings) {
    let nodes = boundings;

    var n = nodes.length
    //console.info('nodes', nodes);
     for(var i=0; i<n; ++i) {
         var node = nodes[i];
         aabbTree.add(node, node.extents);
         node.AABBTree = aabbTree;
     }
     aabbTree.finalize();
     console.info('aabbTree', aabbTree);
     let l = [];
     aabbTree.getOverlappingPairs(l, 0)

     console.info('OverlappingPairs', l);
     // return (aabbTree.getOverlappingPairs([], 0) >>> 1);
}
var sphere1;
export default class PoiLoader {

    constructor() {
        var group = new THREE.Group();

        sphere1 = createSphere(2,0,0,0,0xff0000);
        group.add(sphere1);
        group.add(sphere1.userData.box);

        var sphere2 = createSphere(2.2,3,4.5,0,0x0ff000);
        group.add(sphere2);
        group.add(sphere2.userData.box);

        var wireframe = new THREE.WireframeGeometry( new THREE.BoxBufferGeometry( 20, 20, 20 ) );
        var line = new THREE.LineSegments( wireframe );
        line.material.depthTest = false;
        line.material.opacity = 0.25;
        line.material.transparent = true;

        group.add( line );

        let boundings = [];

        boundings.push(sphere1.getBBox());
        boundings.push(sphere2.getBBox());

        console.info('sphere1', sphere1);
        console.info('sphere2', sphere2);
        setTimeout(() => createTree(boundings));

        this.mesh = group;

    }

    animate(delta) {
        //console.info(delta);
        sphere1.updatePosition(0,0.1*delta,0);
        let pairs = [];
        if (aabbTree.getOverlappingPairs(pairs,0)) {
            console.info(pairs);
        }
    }

}