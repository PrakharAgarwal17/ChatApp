import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import socket from "../../api/ws";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [members, setmembers] = useState([]);
  const { roomcode } = useParams();
  const [msg, setmsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState("");
  const token = localStorage.getItem("token");
  const navigate=useNavigate()
  const BACKEND_URL=import.meta.env.BACKEND_URL


  const userData = JSON.parse(localStorage.getItem("user"));

  const redirectToHome=()=>{
        navigate("/home")
  }

  function submitHandeler(e) {
    e.preventDefault();
    console.log(messages);
    sendmessage();
    setmsg("");
  }

  useEffect(() => {
    socket.connect();
    socket.emit("join-room", {
      username: userData.name,
      roomcode: roomcode,
    });

    socket.on("user-joined", (data) => {
      console.log(data);
      setNotification(data.message);

      setTimeout(() => {
        setNotification("");
      }, 5000);
    });

    socket.on("Recive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("leave-room", (data) => {
      setNotification(data.message);
      setTimeout(() => {
        setNotification("");
      }, 5000);
    });

    socket.on("disconnect", (reason) => {
      console.log(reason);
    });

    return () => {
      socket.off("user-joined");
      socket.off("Recive-message");
      socket.off("leave-room");
      socket.disconnect();

      console.log("user disconnected");
    };
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const receivedChat = await axios.get(
        `${BACKEND_URL}/api/chat/getchat/${roomcode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = receivedChat?.data;
      if (data && data.length > 0) {
      const chat = data[0].chat;
      setMessages([...messages, ...chat]);
      }
    };
    fetch();
  }, []);

  const sendmessage = async () => {
    const data = {
      chatEntered: msg,
      userId: userData.id,
      roomcode: roomcode,
      username: userData.name,
    };

    socket.emit("send-message", data);

    setMessages((prev) => [...prev, data]);
    console.log(messages);

     await axios.post(
      `{BACKEND_URL}/api/chat/chatSection/${roomcode}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const roomDetails = async () => {
    try {
      const room = await axios.get(
        `{BACKEND_URL}/api/room/getParticularRoom/${roomcode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    <div className="flex h-screen bg-gray-950 text-white ">
      <div className="w-72 bg-gray-900 border-r border-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-6">Chat Room</h2>
          <p className="text-gray-400 text-sm">Room Code: {roomcode}</p>
          <h1 className="text-blue-400 mt-5 mb-3 text-xl ">Members:</h1>
          {members.map((elem, idx) => {
            return <p key={idx}>{elem.name}</p>;
          })}
        </div>

        <button className="py-2 rounded-lg bg-red-600 hover:bg-red-500 transition" onClick={()=>{
          redirectToHome()
        }}>
          Leave Room
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h1 className="text-xl font-semibold">General Chat</h1>
        </div>
        {notification != "" ? (
          <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
            <div className="bg-gray-900  border border-green-500 text-white px-4 py-3 rounded-lg shadow-lg min-w-[250px] text-center animate-bounce">
              {notification}
            </div>
          </div>
        ) : (
          " "
        )}

       <div className="flex-1 p-6 overflow-x-hidden overflow-y-auto space-y-4
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-900
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-700
          hover:[&::-webkit-scrollbar-thumb]:bg-gray-600">
          {messages.map((msg, index) => {
            const isMe = (msg.userId || msg.senderId?._id) == userData.id;

            return (
              <div
                key={msg._id || msg.id || index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    isMe ? "bg-emerald-700" : "bg-gray-800"
                  }`}
                >
                  {/* Agar message mera nahi hai, tabhi naam show karo */}
                  {!isMe && (
                    <p className="text-blue-400 font-semibold text-sm mb-1">
                      {msg.sentuser || msg.senderId?.name}
                    </p>
                  )}
                  <p className="text-sm">{msg.chatEntered}</p>
                </div>
              </div>
            );
          })}
        </div>
        <form
          onSubmit={(e) => {
            submitHandeler(e);
          }}
        >
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
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;


// ✅ {!isMe && (...)} - Sirf tab naam show hoga jab message tumhara nahi hai
// ✅ Proper key fix - key={msg._id || msg.id || index}
// ✅ Color consistent - text-blue-400 (sidebar wala blue)