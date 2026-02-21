
export function Home() {
  
  const userData = JSON.parse(localStorage.getItem("user"))
  
  const error = userData.rooms.length === 0 ? "Create or Join a room !!!" : "";

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

            <h2 className="mt-4 text-lg font-semibold">
              {userData?.name}
            </h2>

            <p className="text-sm text-gray-400">
              {userData?.email}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button className="py-2 rounded-lg bg-red-600 hover:bg-red-500 transition">
          Logout
        </button>
      </div>


      {/* Main Content */}
      <div className="flex-1 p-8">

        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">
            Your Rooms
          </h1>

          {/* Create Room Button */}
          <button className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 transition">
            + Create Room
          </button>
        </div>
          
        

        {/* Rooms Grid */}
        <div className="grid grid-cols-3 gap-6">

         <div className="flex justify-center items-center text-xl whitespace-nowrap flex-wrap"><p>{error}</p></div> 

          {userData.rooms.map((elem,idx)=>{
             return(
               <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold">Room 1</h3>
            <p className="text-sm text-gray-400 mt-1">
              Created by you
            </p>

            <button className="mt-4 w-full py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 transition">
              Join Room
            </button>
          </div>
             )
          })}

        </div>
      </div>

    </div>
  );
}