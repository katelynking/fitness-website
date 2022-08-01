import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3002");

function Chat() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState('');
  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
        setMessageReceived(data.message);
    });

  }, [socket]);

  return (
    <div>
      <ul id="messages"></ul>
      <form id="form" action="">
        <input placeholder="Message..." onChange={(event) => {
            setMessage(event.target.value)
        }} id="input" autoComplete="off" />
        <button onClick={sendMessage}>Send</button>
        <h1>Message: </h1>
        {messageReceived}
      </form>
    </div>
  );
}

export default Chat;
