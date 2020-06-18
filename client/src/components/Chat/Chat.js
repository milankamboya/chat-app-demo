import React, { useState, useEffect } from 'react';
import './Chat.css';
import queryString from 'query-string';
import socketIOClient from 'socket.io-client';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import InfoBar from '../InfoBar/InfoBar';
import TextContainer from '../TextContainer/TextContainer';
let socket;

const Chat = ({ location }) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState();

  const ENDPOINT = 'localhost:3001';

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

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(messages => [...messages, message]);
    });
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })
  }, []);

  const sendMessage = e => {
    e.preventDefault();
    if (message)
      socket.emit('sendMessage', message, () => setMessage(''));
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />

        <Messages messages={messages} name={name} />

        <Input
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  )
}

export default Chat;