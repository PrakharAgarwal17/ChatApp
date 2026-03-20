import { io } from "../app.js";

export async function setupSocketHandlers(io){
    console.log("hey")
    
    io.on("connection", (socket) => {
  console.log("user connect", socket.id);

  socket.on("join-room", (data) => {
    const Roomcode = data.roomcode;

    socket.roomcode = Roomcode;     // 👈 per-socket store
    socket.username = data.username;

    socket.join(Roomcode);

    socket.to(Roomcode).emit("user-joined", {
      userId: socket.id,
      message: `${data.username} joined`
    });
  });

  socket.on("disconnect", (reason) => {
    console.log("user disconnected:", socket.id, reason);

    if (socket.roomcode) {
      socket.to(socket.roomcode).emit("leave-room", {
        userId: socket.id,
        message: `${socket.username} left`
      });
    }
  });
});
}
