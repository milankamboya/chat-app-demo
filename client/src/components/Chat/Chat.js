import React, { useState, useEffect } from 'react';
import './Chat.css';
import queryString from 'query-string';
import socketIOClient from 'socket.io-client';

const Chat = ({ location }) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:3001';
  let socket;

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);
    // socketIOClient.connect(ENDPOINT);
    socket = socketIOClient(ENDPOINT);

    socket.emit('join', { name, room }, () => { });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }

  }, [ENDPOINT, location.search]);

  return (
    <div>
      {name}-{room}
    </div>
  )
}

export default Chat;