
export default class MeshLoader { 

    constructor(obj3d) {
        this.subscriptions = {};
        this.obj3d = obj3d;
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
                console.info(`Mesh ready ${meshModule}`, Mesh);
                if (_mesh) {
                    this.obj3d.remove(_mesh);
                    if (_mesh.destroy)
                        _mesh.destroy();
                }

                _mesh = Mesh.default();

                this.obj3d.add(_mesh);
            });
    }
}
