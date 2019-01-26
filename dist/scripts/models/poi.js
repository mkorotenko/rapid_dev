import * as THREE from "../../lib/three.module.js";

var demo;
export default class PoiLoader {

    constructor() {
        var group = new THREE.Group();

        window.THREE = THREE;

        console.info('window', window);
        demo = new CANNON.Demo({
            _scene: group
        });
        var size = 1;
        var interval;
    
        // Spheres
        demo.addScene("Pile",function(){
            if(interval) clearInterval(interval);
            console.info('addScene');
    
            var world = demo.getWorld();
    
            world.gravity.set(0,0,0);
            world.broadphase = new CANNON.NaiveBroadphase();
            world.solver.iterations = 1;
    
            world.defaultContactMaterial.contactEquationStiffness = 5e8;
            world.defaultContactMaterial.contactEquationRelaxation = 0.9;
    
            // Since we have many bodies and they don't move very much, we can use the less accurate quaternion normalization
            world.quatNormalizeFast = true;
            world.quatNormalizeSkip = 4; // ...and we do not have to normalize every step.
    
            // plane -x
            var planeShapeXmin = new CANNON.Plane();
            var planeXmin = new CANNON.Body({ mass: 0 });
            planeXmin.addShape(planeShapeXmin);
            planeXmin.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0),Math.PI/2);
            planeXmin.position.set(-5,0,0);
            world.add(planeXmin);
    
            // Plane +x
            var planeShapeXmax = new CANNON.Plane();
            var planeXmax = new CANNON.Body({ mass: 0 });
            planeXmax.addShape(planeShapeXmax);
            planeXmax.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0),-Math.PI/2);
            planeXmax.position.set(5,0,0);
            world.add(planeXmax);
    
            // Plane -y
            var planeShapeYmin = new CANNON.Plane();
            var planeYmin = new CANNON.Body({ mass: 0 });
            planeYmin.addShape(planeShapeYmin);
            planeYmin.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),-Math.PI/2);
            planeYmin.position.set(0,-5,0);
            world.add(planeYmin);
    
            // Plane +y
            var planeShapeYmax = new CANNON.Plane();
            var planeYmax = new CANNON.Body({ mass: 0 });
            planeYmax.addShape(planeShapeYmax);
            planeYmax.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),Math.PI/2);
            planeYmax.position.set(0,5,0);
            world.add(planeYmax);
    
            var boxShape = new CANNON.Box(new CANNON.Vec3(5,5,1));
            var boxBody = new CANNON.Body({ mass: 0 });
            boxBody.addShape(boxShape);
            boxBody.position.set(0,0,-15);
            world.addBody(boxBody);
            demo.addVisual(boxBody);
    
            var boxShape1 = new CANNON.Box(new CANNON.Vec3(5,5,1));
            var boxBody1 = new CANNON.Body({ mass: 0 });
            boxBody1.addShape(boxShape1);
            boxBody1.position.set(0,0,25);
            world.addBody(boxBody1);
            demo.addVisual(boxBody1);

            console.info('boxes', boxBody1)
            var bodies = [];
            var i = 0;
            interval = setInterval(function(){
                // Sphere
                i++;
                var sphereShape = new CANNON.Sphere(0.5);
                var b1 = new CANNON.Body({ mass: 5 });
                b1.addShape(sphereShape);
                b1.position.set(2*size*Math.sin(i),2*size*Math.cos(i),0);

                b1.velocity.set((Math.random() * 5) - 2.5,(Math.random() * 5) - 2.5,(Math.random() * 5) - 2.5);
                world.add(b1);
                demo.addVisual(b1);
                bodies.push(b1);
    
                if(bodies.length>800){
                    var b = bodies.shift();
                    demo.removeVisual(b);
                    world.remove(b);
                }
                if (i>800)
                    clearInterval(interval);
            },100);
        });
    
        demo.start();

        console.info('group', group);
        this.mesh = group;

    }

    animate(delta) {

        demo.updateVisuals();
        demo.updatePhysics();

    }

}

function getSphere(r, x,y,z,col) {

    var geometry = new THREE.SphereGeometry( 5, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphere = new THREE.Mesh( geometry, material );

    // var sg = new THREE.SphereBufferGeometry( r, 10, 10 );
    // var wf = new THREE.WireframeGeometry( sg );

//     var sphere = new THREE.LineSegments( wf );
//     sphere.material.depthTest = false;
//     sphere.material.opacity = 0.25;
//     sphere.material.transparent = true;
    sphere.position.x = x||0;
    sphere.position.y = y||0;
    sphere.position.z = z||0;

    return sphere;
//     var helper = new THREE.BoxHelper(sphere, col);
//     helper.update();
//     sphere.userData.box = helper;

//     sphere.updateBBox = function() {
//         if (!sphere.boundingBox)
//             sphere.boundingBox = [];
//         let bb = sphere.boundingBox;
//         let _bb = getBoundingBox(sphere.geometry.boundingBox, sphere.position);
//         if (sphere.aabbNode && sphere.aabbNode.AABBTree) {
//             sphere.aabbNode.AABBTree.update(sphere.aabbNode, _bb);
//         } else {
//             bb[0] = _bb[0];
//             bb[1] = _bb[1];
//             bb[2] = _bb[2];
//             bb[3] = _bb[3];
//             bb[4] = _bb[4];
//             bb[5] = _bb[5];
//         }
//     }

//     sphere.getBBox = function() {
//         if (!sphere.geometry.boundingBox) {
//             sphere.geometry.computeBoundingBox();
//         }
//         sphere.updateBBox();
//         var b = sphere.boundingBox;
//         return sphere.aabbNode = {
//             spatialIndex: -1,
//             extents: b
//         }
//     }

//     sphere.updatePosition = function(x,y,z) {
//         sphere.position.x += x || 0;
//         sphere.position.y += y || 0;
//         sphere.position.z += z || 0;

//         sphere.userData.box.update();

//         sphere.updateBBox();
//     }

//     return sphere;
}


// function getBoundingBox(boundingBox, position) {
//     return [
//         boundingBox.min.x + position.x,
//         boundingBox.min.y + position.y,
//         boundingBox.min.z + position.z,
//         boundingBox.max.x + position.x,
//         boundingBox.max.y + position.y,
//         boundingBox.max.z + position.z
//     ]
// }

// function createSphere(r, x,y,z,col) {

//     var sg = new THREE.SphereBufferGeometry( r, 10, 10 );
//     var wf = new THREE.WireframeGeometry( sg );

//     var sphere = new THREE.LineSegments( wf );
//     sphere.material.depthTest = false;
//     sphere.material.opacity = 0.25;
//     sphere.material.transparent = true;
//     sphere.position.x = x||0;
//     sphere.position.y = y||0;
//     sphere.position.z = z||0;

//     var helper = new THREE.BoxHelper(sphere, col);
//     helper.update();
//     sphere.userData.box = helper;

//     sphere.updateBBox = function() {
//         if (!sphere.boundingBox)
//             sphere.boundingBox = [];
//         let bb = sphere.boundingBox;
//         let _bb = getBoundingBox(sphere.geometry.boundingBox, sphere.position);
//         if (sphere.aabbNode && sphere.aabbNode.AABBTree) {
//             sphere.aabbNode.AABBTree.update(sphere.aabbNode, _bb);
//         } else {
//             bb[0] = _bb[0];
//             bb[1] = _bb[1];
//             bb[2] = _bb[2];
//             bb[3] = _bb[3];
//             bb[4] = _bb[4];
//             bb[5] = _bb[5];
//         }
//     }

//     sphere.getBBox = function() {
//         if (!sphere.geometry.boundingBox) {
//             sphere.geometry.computeBoundingBox();
//         }
//         sphere.updateBBox();
//         var b = sphere.boundingBox;
//         return sphere.aabbNode = {
//             spatialIndex: -1,
//             extents: b
//         }
//     }

//     sphere.updatePosition = function(x,y,z) {
//         sphere.position.x += x || 0;
//         sphere.position.y += y || 0;
//         sphere.position.z += z || 0;

//         sphere.userData.box.update();

//         sphere.updateBBox();
//     }

//     return sphere;
// }

// // passing 'true' would use a much slower building strategy
// var aabbTree = AABBTree.create(false);

// function createTree(boundings) {
//     let nodes = boundings;

//     var n = nodes.length
//     //console.info('nodes', nodes);
//      for(var i=0; i<n; ++i) {
//          var node = nodes[i];
//          aabbTree.add(node, node.extents);
//          node.AABBTree = aabbTree;
//      }
//      aabbTree.finalize();
//      console.info('aabbTree', aabbTree);
//      let l = [];
//      aabbTree.getOverlappingPairs(l, 0)

//      console.info('OverlappingPairs', l);
//      // return (aabbTree.getOverlappingPairs([], 0) >>> 1);
// }
//var sphere1;


        // sphere1 = createSphere(2,0,0,0,0xff0000);
        // group.add(sphere1);
        // group.add(sphere1.userData.box);

        // var sphere2 = createSphere(2.2,3,4.5,0,0x0ff000);
        // group.add(sphere2);
        // group.add(sphere2.userData.box);

        // var wireframe = new THREE.WireframeGeometry( new THREE.BoxBufferGeometry( 20, 20, 20 ) );
        // var line = new THREE.LineSegments( wireframe );
        // line.material.depthTest = false;
        // line.material.opacity = 0.25;
        // line.material.transparent = true;

        // group.add( line );

        // let boundings = [];

        // boundings.push(sphere1.getBBox());
        // boundings.push(sphere2.getBBox());

        // // console.info('sphere1', sphere1);
        // // console.info('sphere2', sphere2);
        // setTimeout(() => createTree(boundings));
                
        //console.info(delta);
        // sphere1.updatePosition(0,0.1*delta,0);
        // let pairs = [];
        // if (aabbTree.getOverlappingPairs(pairs,0)) {
        //     console.info(pairs);
        // }