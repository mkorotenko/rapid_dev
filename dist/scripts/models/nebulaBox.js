import modelLoader from './modelLoader.js';

export default function() {
    return new Promise(function(resolve, reject) {
        const nebula = modelLoader.colladaGroup('./models/collada/models/Middle_Nebula.dae')

        Promise.all([nebula]).then( models => {
            function getMeshes(group) {
                var res = [];
                function req(group1) {
                    if (!group1 || !group1.children) return;
                    group1.children.forEach(o => {
                        if (o.material)
                            res.push(o)
                        else
                            req(o)
                    })
                }
                req(group);
                return res;
            }
            getMeshes(models[0]).forEach(m => {
                //m.material.depthTest = true;
                //m.material.transparent = false;
                m.renderOrder = -1;
            })
            models[0].name = 'Nebula group';
            models[0].scale.multiplyScalar(10);

            resolve(models[0]);
        });
        
    })

}
