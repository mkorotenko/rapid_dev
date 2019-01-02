
export default class MeshLoader { 

    constructor(obj3d, meshModule) {
        this.subscriptions = {};
        this.animations = [];
        this.obj3d = obj3d;
        if (meshModule)
            this.importMesh(meshModule);
    }

    destroy() {
        Object.keys(this.subscriptions).forEach(k => this.subscriptions[k]());
    }

    importMesh(meshModule) {
        if (this.subscriptions[meshModule]) {
            this.subscriptions[meshModule]();
        }

        let _mesh,
            animation;
        this.subscriptions[meshModule] = module(meshModule)
            .subscribe((Mesh) => {
                if (_mesh) {
                    this.obj3d.remove(_mesh.mesh);
                    this.moduleAnimate = undefined;
                    if (animation)
                        this.animations.splice(this.animations.indexOf(animation), 1);
                    if (_mesh.destroy)
                        _mesh.destroy();
                }

                _mesh = new Mesh.default();

                animation = _mesh.animate;
                if (animation)
                    this.animations.push(animation);

                this.obj3d.add(_mesh.mesh);
            }, 
            () => {
                if (_mesh) {
                    console.info(`Mesh removed ${meshModule}`);
                    this.obj3d.remove(_mesh.mesh);
                    this.moduleAnimate = undefined;
                    if (animation)
                        this.animations.splice(this.animations.indexOf(animation), 1);
                    if (_mesh.destroy)
                        _mesh.destroy();
                }
            });
    }

    animate(delta) {
        this.animations.forEach(a => a(delta));
    }
}
