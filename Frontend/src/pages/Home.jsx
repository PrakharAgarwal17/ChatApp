import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function Home() {
  const navigate = useNavigate();
  const [room, setRoom] = useState([]);
  
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRoom = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/room/getroom", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoom(res.data.rooms);
    };
    fetchRoom();
  }, []);

  function removeToken(){
    localStorage.removeItem("token")
    setTimeout(() => {
      navigate("/signin")
    }, 500);
  }

 function navigatejoinroom (e) {
  navigate(`/${e}`)
 }
  return (
    <div className="min-h-screen bg-gray-950 text-white flex">

      {/* Sidebar */}
      <div className="w-72 bg-gray-900 border-r border-gray-800 p-6 flex flex-col justify-between">
        <div>
          {/* Profile */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center text-2xl font-bold">
              {userData?.name?.charAt(0)}
            </div>

            <h2 className="mt-4 text-lg font-semibold">{userData?.name}</h2>

            <p className="text-sm text-gray-400">{userData?.email}</p>
          </div>
        </div>

        {/* Logout */}
        <button className="py-2 rounded-lg bg-red-600 hover:bg-red-500 transition" onClick={removeToken}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Top Bar */}
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">Your Rooms</h1>

          <div className="flex items-end mb-6 gap-3">
            {/* Create Room Button */}
            <button
              className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 transition"
              onClick={() => {
                navigate("/enterRoom");
              }}
            >
              + Enter Code
            </button>

            <button
              className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 transition"
              onClick={() => {
                navigate("/createroom");
              }}
            >
              + Create Room
            </button>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-3 gap-6">
          {room.map((elem, idx) => {
            return (
              <div
                key={idx}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5"
              >
                <h3 className="text-2xl font-semibold">{elem.roomName}</h3>
                <p className="text-sm text-gray-300 mt-1">Code: {elem.code}</p>
                <p className="text-sm text-blue-500 mt-1"> {userData.name}</p>
                <button onClick={() => {navigatejoinroom(elem.code)}} className="mt-4 w-full py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 transition">
                 Join room
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
