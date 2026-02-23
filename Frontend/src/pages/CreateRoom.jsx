import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateRoom() {
  const navigate = useNavigate();
  const [roomName, setroomName] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:3000/api/room/createroom",
      { roomName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response.data);
    const room = response.data.room;

    const user = JSON.parse(localStorage.getItem("user"));

    user.rooms = [...(user.rooms || []), room];

    localStorage.setItem("user", JSON.stringify(user));

    setStatus(response.status);
    setMsg(response.data.message);
    setTimeout(() => {
      navigate("/home", { state: { newroom: room } });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex-col bg-gray-950 text-white flex items-center justify-center px-4">
      {msg && (
        <div
          className={`w-[400px] flex justify-center items-center p-10 h-10 relative rounded-md mb-20 ${status == 201 ? "bg-green-600" : "bg-red-600"}`}
        >
          {msg}
        </div>
      )}
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Create New Room
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Give your room a name to get started
        </p>
        <form
          action="http://localhost:3000/api/rooms/create"
          method="POST"
          className="space-y-5"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div>
            <label className="text-sm text-gray-400 mb-1 block">
              Room Name
            </label>

            <input
              name="roomName"
              type="text"
              placeholder="e.g. Project Discussion"
              value={roomName}
              onChange={(e) => {
                setroomName(e.target.value);
              }}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] transition font-medium"
          >
            Create Room
          </button>
        </form>

        <button
          onClick={() => navigate("/home")}
          className="mt-4 w-full py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
