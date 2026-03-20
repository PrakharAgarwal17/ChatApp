import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import socket  from "../../api/ws";

const Chat = () => {
  const [members, setmembers] = useState([]);
  const { roomcode } = useParams();
  const [msg, setmsg] = useState("");
  const [notification , setNotification] = useState("")
  const token = localStorage.getItem("token");

  const userData=JSON.parse(localStorage.getItem("user"))

  function submitHandeler(e) {
    e.preventDefault();
  }
  
  useEffect(() => {
  
    socket.connect()
    socket.emit("join-room" , {
       username:userData.name,
       roomcode:roomcode
    })

    socket.on("user-joined",(data)=>{
        console.log(data)
        setNotification(data.message)
        
        setTimeout(() => {
          setNotification("")
        }, 5000 );
    })
    socket.on("leave-room" , (data) => {
    setNotification(data.message)
       setTimeout(() => {
          setNotification("")
        }, 5000 );
    })
    
 socket.on("disconnect", (reason) => {
  console.log(reason)
});


return () => {
  socket.disconnect()

  
  console.log("user disconnected")
}
    
  }, []);


  const roomDetails = async () => {
    try {
      const room = await axios.get(
        `http://localhost:3000/api/room/getParticularRoom/${roomcode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setmembers(room.data.details.members);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    roomDetails();
  }, [roomcode]);

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <div className="w-72 bg-gray-900 border-r border-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-6">Chat Room</h2>
          <p className="text-gray-400 text-sm">Room Code: {roomcode}</p>
          <h1 className="text-blue-400 mt-5 mb-3 text-xl ">Members:</h1>
          {members.map((elem, idx) => {
            return <p key={idx}>{elem.name}</p>;
          })}
        </div>

        <button className="py-2 rounded-lg bg-red-600 hover:bg-red-500 transition">
          Leave Room
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h1 className="text-xl font-semibold">General Chat</h1>
        </div>
        {(notification != "" )? 
      <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
    <div className="bg-gray-900  border border-green-500 text-white px-4 py-3 rounded-lg shadow-lg min-w-[250px] text-center animate-bounce">
      {notification}
    </div>
  </div> :" "    
}

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              A
            </div>
            <div className="bg-gray-800 p-3 rounded-lg max-w-xs">
              <p className="text-sm text-gray-300">Hello bro 👋</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-emerald-700 p-3 rounded-lg max-w-xs">
              <p className="text-sm">Hey! What's up?</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              B
            </div>
            <div className="bg-gray-800 p-3 rounded-lg max-w-xs">
              <p className="text-sm text-gray-300">Kaam ho gaya kya?</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-800 flex gap-3">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
            value={msg}
            onChange={(e) => {
              setmsg(e.target.value);
            }}
          />
          <button
            className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 transition"
            onClick={(e) => {
              submitHandeler(e);
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
