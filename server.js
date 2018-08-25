// server.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app); 
var io = require('socket.io')(server);
//var events = require('events');

var debugMode = false;

app.use(express.static(__dirname + '/dist')); 
//redirect / to our index.html file
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/dist/index.html');
});

//var eventEmitter = new events.EventEmitter();
//when a client connects, do this
io.on('connection', function(client) {

    console.log('Socket: client connected');
    client.on('debugMode', function(data) { //get light switch status from client
       console.log('debugMode:', data); //turn LED on or off, for now we will just show it in console.log
       debugMode = data;
       //eventEmitter.on('newData', function() {
        client.emit('newData', debugMode);
       //});
   });

});

//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('HTTP server on port 3000');
}); 

// app.get('/docs/:docDate', function(req, res) {
//     res.json({f:1});
// });
