import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EnterRoom = () => {
  const navigate = useNavigate();
  const [enteredCode, setenteredCode] = useState("");
  const [status, setStatus] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/api/room/joinroom",
        { enteredCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setStatus(response.status);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  if (status) {
    const timer = setTimeout(() => {
       if(status==200){
        navigate(`/${enteredCode}`)
        console.log(enteredCode)
      }
      setStatus("");
      setenteredCode("")
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [status,enteredCode]);
  return (
    <div>
      <div className="min-h-screen flex-col bg-gray-950 text-white flex items-center justify-center px-4">
        {status && (
          <div
            className={`notification fixed top-20 h-[50px] w-[300px] flex justify-center items-center rounded-md ${
              status === 200 ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {status === 200 ? "Joined Successfully" : "Failed to join"}
          </div>
        )}
        <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-center mb-2">
            Enter New Room
          </h1>
          <p className="text-sm text-gray-400 text-center mb-6">
            Enter the code to join a room
          </p>
          <form
            className="space-y-5"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div>
              <label className="text-sm text-gray-400 mb-1 block">
                Room Code
              </label>

              <input
                name="roomName"
                type="text"
                placeholder="e.g. XXXXXX"
                value={enteredCode}
                onChange={(e) => {
                  setenteredCode(e.target.value);
                }}
                className="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] transition font-medium"
            >
              Join Room
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
    </div>
  );
};

export default EnterRoom;
