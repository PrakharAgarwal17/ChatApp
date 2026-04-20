import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function Home() {
  const navigate = useNavigate();
  const [room, setRoom] = useState([]);
  const BACKEND_URL=import.meta.env.VITE_BACKEND_URL

  
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRoom = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(BACKEND_URL, {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {room.map((elem, idx) => {
            return (
              <div
                key={idx}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 min-w-0"
              >
                <h3 className="text-2xl font-semibold">{elem.roomName}</h3>
                <p className="text-sm text-gray-300 mt-1">Code: {elem.code}</p>
                <p className="text-sm text-blue-500 mt-1">By~ {elem.owner.name}</p>
        <div className="flex flex-wrap gap-2 mt-4"> 
  <button
    onClick={() => navigatejoinroom(elem.code)}
    className="flex-1 min-w-[120px] py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 transition text-sm"
  >
    Join room
  </button>

  <button
    onClick={() => navigatejoinroom(elem.code)}
    className="flex-1 min-w-[100px] py-2 rounded-lg bg-red-700 hover:bg-red-600 transition text-sm"
  >
    Remove
  </button>
</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
