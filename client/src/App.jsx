import { useState } from 'react';
import './App.css';
import io, { connect } from 'socket.io-client';
import Chats from "./components/Chats";
const socket = io.connect(
  "https://vercel-deployment-server-agr9gnrn6-pushkarbhangale15s-projects.vercel.app"
);
function App() {
  const [username,setUsername]=useState("");
  const [room,setRoom]=useState("");
  const [showChat,setshowChat]=useState(false);
  const joinRoom=()=>{
     if(username!=="" && room!==""){
      socket.emit("join_room",room);
      setshowChat(true);
     }

  }

  return (
    <>
    <div className="App">
    {!showChat ? (
    <div className="joinChatContainer">
      <h3>Join A Chat</h3>
      <input type="text" placeholder='John...' onChange={
        (event)=>{
          setUsername(event.target.value);
        }
      }
      />
      <input type="text" placeholder='Room ID...' onChange={
        (event)=>{
          setRoom(event.target.value);
        }
      }
      />
      <button onClick={joinRoom}>Join A Room</button>
      </div>
    )
:(      <Chats socket={socket} username={username} room={room}/>
)}
      </div>
    </>
  )
}

export default App
