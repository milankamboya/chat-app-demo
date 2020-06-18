import React, { useState } from 'react';
import './Join.css';
import { Link } from 'react-router-dom';

const Join = () => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const handleName = e => setName(e.target.value);
  const handleRoom = e => setRoom(e.target.value);
  const linkClickHandler = e => (!name || !room) ? e.preventDefault() : null;

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div><input placeholder="name" className="joinInput" type="text" onChange={handleName} /></div>
        <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={handleRoom} /></div>
        <Link to={`/chat?name=${name}&room=${room}`} onClick={linkClickHandler}>
          <button className="button mt-20">Join</button>
        </Link>
      </div>
    </div>
  )
}
export default Join;