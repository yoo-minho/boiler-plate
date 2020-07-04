var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const chat = io
  .of('/chat')
  .on('connection', (socket) => {
      console.log('chat');
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });

const news = io
  .of('/news')
  .on('connection', (socket) => {
     console.log('news');
     socket.emit('item', { news: 'item' });
  });