//http://thisdavej.com/how-to-watch-for-files-changes-in-node-js/
const fs = require('fs');

exports.watch = function(fileWatch, callback) {
    console.log(`Watching for file changes on ${fileWatch}`);
    let fsWait = false;
    fs.watch(fileWatch, (event, filename) => {
      if (filename) {
        if (fsWait) return;
        fsWait = setTimeout(() => {
          fsWait = false;
        }, 100);
    
        console.log(`${filename} file Changed`);
        if (callback)
            callback(filename);
      }
    });
}
