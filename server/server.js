const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  return res.json("Server started properly and working root url.")
});

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
  console.log('new connection!!!');

  socket.on('join', (message, callback) => {
    const { name, room } = message;

    const { error, user } = addUser({ name, room, id: socket.id });
    if (error)
      return callback(error);

    socket.join(user.room);
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!!!` });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      console.log(`${user.name} has left!!!`);
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left!` })
    }
  });
})

server.listen(PORT, () => console.log(`server started successfully on ${PORT}`));