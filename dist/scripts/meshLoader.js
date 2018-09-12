
export default class MeshLoader { 

    constructor(obj3d, meshModule) {
        this.subscriptions = {};
        this.obj3d = obj3d;
        if (meshModule)
            this.importMesh(meshModule);
    }

    destroy() {
        Object.keys(this.subscriptions).forEach(k => this.subscriptions[k]());
    }

    importMesh(meshModule) {
        if (this.subscriptions[meshModule])
            this.subscriptions[meshModule]();

        let _mesh;
        this.subscriptions[meshModule] = module(meshModule)
            .subscribe((Mesh) => {
                if (_mesh) {
                    this.obj3d.remove(_mesh.mesh);
                    if (_mesh.destroy)
                        _mesh.destroy();
                }

                //console.info(`Mesh ready ${meshModule}`, Mesh);
                _mesh = new Mesh.default();

                this.obj3d.add(_mesh.mesh);
            }, 
            () => {
                if (_mesh) {
                    console.info(`Mesh removed ${meshModule}`);
                    this.obj3d.remove(_mesh.mesh);
                    if (_mesh.destroy)
                        _mesh.destroy();
                }
            });
    }
}
