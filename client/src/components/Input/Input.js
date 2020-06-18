import React from 'react';
import './Input.css';

const Input = props => {
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="type..."
        value={props.message}
        onChange={e => props.setMessage(e.target.value)}
        onKeyPress={e => e.key === 'Enter' ? props.sendMessage(e) : null}
      />
      <button className="sendButton" onClick={e => props.sendMessage(e)}>Send</button>
    </form>
  )
}

export default Input;