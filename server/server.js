const express = require('express');
const socketio = require('socket.io');
const http = require('http');

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
    const {name, room} = message;
    console.log(`someone joined in ${room} as ${name}`);
    callback();
  });

  socket.on('disconnect', () => console.log('connection gone!!!'));
})

server.listen(PORT, () => console.log(`server started successfully on ${PORT}`));