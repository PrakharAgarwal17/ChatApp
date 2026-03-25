import { io } from "../app.js";

export async function setupSocketHandlers(io) {
  console.log("setup Socket");

  io.on("connection", (socket) => {
    console.log("user connect", socket.id);

    socket.on("join-room", (data) => {
      const Roomcode = data.roomcode;

      socket.roomcode = Roomcode;
      socket.username = data.username;

      socket.join(Roomcode);

      socket.to(Roomcode).emit("user-joined", {
        userId: socket.id,
        message: `${data.username} joined`,
      });
    });

    socket.on("send-message", (data) => {
      console.log(data);

      socket.to(socket.roomcode).emit("Recive-message",{
        chatEntered:data.chatEntered,
        sentuser:data.username,
        userId:data.userId,
        roomcode:data.roomcode
      })
    });
   
    socket.on("disconnect", (reason) => {
      console.log("user disconnected:", socket.id, reason);

      if (socket.roomcode) {
        socket.to(socket.roomcode).emit("leave-room", {
          userId: socket.id,
          message: `${socket.username} left`,
        });
      }
    });
  });
}
