const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server); //hello I am new

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//routes
app.get('/player1', function(req,res) {
    res.sendFile(__dirname + '/public/player1.html');
});

app.get('/player2', function(req,res) {
    res.sendFile(__dirname + '/public/player2.html');
});

//websocket stuff
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');

    socket.on('disconnect', function(data) {
        console.log(socket.id + ' has disconnected');
    });

    //custom events
    //socket = one client
    //socketIO.sockets = all clients
    socket.on('red', function(data) {
        console.log('red event heard');
        socketIO.sockets.emit('color_change', {r:255, g:0, b:0});
    });

    socket.on('green', function(data) {
        console.log('green event heard');
        socketIO.sockets.emit('color_change', {r:0, g:255, b:0});
    });

    socket.on('blue', function(data) {
        console.log('blue event heard');
        socketIO.sockets.emit('color_change', {r:0, g:0, b:255});
    });
});

//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);