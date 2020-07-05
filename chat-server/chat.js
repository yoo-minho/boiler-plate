var express = require('express');
const { CLIENT_RENEG_WINDOW } = require('tls');
var app = express();
var port = 4001;
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var onlineUsers = {}; // 현재 online인 회원이 담기는 object

const nsp = io.of('/');

nsp.on('connection', (socket) => {

  socket.on("joinLobby", function (data) {
    onlineUsers[data.id] = {roomId: data.roomId, socketId: socket.id};
    socket.join('room' + data.roomId);
    nsp.in('room' + data.roomId).emit("updateUserList", {
      userList : getUsersByRoomId(data.roomId),
      joinedId : data.id
    });
  });

  socket.on('joinNewRoom', (data) => {
    let id = getUserBySocketId(socket.id);
    let prevRoomId = onlineUsers[id].roomId
    let nextRoomId = data.roomId;

    if(prevRoomId === nextRoomId) return;

    socket.leave('room' + prevRoomId);
    socket.join('room' + nextRoomId);
    onlineUsers[id].roomId = data.roomId;
    updateUserList(prevRoomId, nextRoomId, id);
    console.log(onlineUsers);
  })

  socket.on('sendMessage', (data) => {
    console.log('message: ' + data);
    console.log(Object.keys(nsp.sockets).length);
    nsp.in('room' + data.roomId).emit('receiveMessage', {
      name: getUserBySocketId(socket.id),
      socketId: socket.id,
      message: data.message
    });
  });
  
  socket.on('disconnect', function () {
    if (!socket.id) return;
    let id = getUserBySocketId(socket.id);
    if(id === undefined || id === null){
        return;
    }
    let roomId = onlineUsers[id].roomId || 0;
    delete onlineUsers[getUserBySocketId(socket.id)];
    updateUserList(roomId, 0, id);
  });
  
  function getUserBySocketId(id) {
    return Object.keys(onlineUsers).find(key => onlineUsers[key].socketId === id);
  }

  function updateUserList(prev, next, id) {
    console.log(prev + "/" + next + "/" + id);
    if (prev !== 0) {
        nsp.in('room' + prev).emit("updateUserList", {
          userList : getUsersByRoomId(prev),
          leftedId : id
        });
    }
    if (next !== 0) {
        nsp.in('room' + next).emit("updateUserList", {
          userList : getUsersByRoomId(next),
          joinedId : id
        });
    }
  }

  function getUsersByRoomId(roomId) {
    let userstemp = [];
    Object.keys(onlineUsers).forEach((el) => {
        if (onlineUsers[el].roomId === roomId) {
            userstemp.push({
                socketId: onlineUsers[el].socketId,
                name: el
            });
        }
    });
    return userstemp;
  }

});

server.listen(port, () => {
  console.log('listening on *:'+port);
});

