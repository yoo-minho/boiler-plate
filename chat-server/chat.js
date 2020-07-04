var express = require('express');
var app = express();
var port = 4001;
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

const nsp = io.of('/');

nsp.on('connection', (socket) => {

  socket.on('sendMessage', (data) => {

    console.log('message: ' + data);
    console.log(Object.keys(nsp.sockets).length);

    nsp.emit('receiveMessage', data);
  });

});

server.listen(port, () => {
  console.log('listening on *:'+port);
});

