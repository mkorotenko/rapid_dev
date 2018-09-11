import * as THREE from "../../lib/three.module.js";

export default class PoiLoader {

    constructor() {

        // var pinkMat = new THREE.MeshPhongMaterial({
        //     color: new THREE.Color("rgb(206,35,213)"),
        //     emissive: new THREE.Color("rgb(55,28,34)"),
        //     specular: new THREE.Color("rgb(255,155,155)"),
        //     shininess: 3,
        //     flatShading: THREE.FlatShading,
        //     transparent: true,
        //     opacity: 1
        // });
        var group = new THREE.Group();

        // var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
        // var geo = new THREE.BoxGeometry( 20, 20, 20 );
        // //new THREE.IcosahedronGeometry(25, 5)
        // group.add(new THREE.Mesh(geo, mat));

        var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );

        var wireframe = new THREE.WireframeGeometry( geometry );
        
        var line = new THREE.LineSegments( wireframe );
        line.material.depthTest = false;
        line.material.opacity = 0.25;
        line.material.transparent = true;
        group.add( line );
        console.info('line', line);

        this.mesh = group;
    }


}