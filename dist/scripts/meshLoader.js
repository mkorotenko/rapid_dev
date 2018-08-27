
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

        let meshID;
        this.subscriptions[meshModule] = module(meshModule)
            .subscribe((Mesh) => {
                console.info(`Mesh ready ${meshModule}`, Mesh);
                let prevMesh;
                if (prevMesh = this.obj3d.children.find(m => m.uuid === meshID))
                    this.obj3d.remove(prevMesh);

                let mesh = Mesh.default();
                meshID = mesh.uuid;

                this.obj3d.add(mesh);
            });
    }
}
