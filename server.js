// server.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io')(server);
var events = require('events');
const fw = require('./fileWatcher');

var path = require('path'), fs = require('fs');

function fromDir(startPath, filter, callback) {

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter, callback); //recurse
        }
        else if (filter.test(filename)) callback(filename);
    };
};

app.use(express.static(__dirname + '/dist', {
    // etag: false,
    // maxage: 0
}));
//redirect / to our index.html file
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/dist/index.html');
});

var eventEmitter = new events.EventEmitter();
function setFileWatcher(filePathName) {
    fw.watch(filePathName.replace('./', './dist/'), function () {
        eventEmitter.emit('fileChange', filePathName);
    });
}

fromDir('./dist/scripts', /\.js$/, function (filename) {
    let fn = filename.replace('dist\\', './').split('\\').join('/');
    setFileWatcher(fn);
});

//when a client connects, do this
socket.on('connection', function (client) {

    console.log('Socket: client connected');

    var handler = function (fileName) {
        client.emit('fileChange', fileName);
    };

    eventEmitter.on('fileChange', handler)

    client.on('disconnect', (reason) => {
        console.log('Socket: client disconnect', reason);
        eventEmitter.removeListener('fileChange', handler);
    });

});

//start our web server and socket.io server listening
server.listen(3000, function () {
    console.log('HTTP server on port 3000');
});

// app.get('/docs/:docDate', function(req, res) {
//     res.json({f:1});
// });
