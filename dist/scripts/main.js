//import 
export function init(event) {
    console.info('main.js ready');
    event.subscribe('fileChange', (fileName) => {
        console.info('Main: fileChange', fileName)
    })
}
