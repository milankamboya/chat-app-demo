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

server.listen(PORT, ()=> console.log(`server started successfully on ${PORT}`));