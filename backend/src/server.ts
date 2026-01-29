import app from "./app.ts";
import { connectDB } from "./database/db.ts";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const onlineUsers = new Map();
const pendingMessages: {
  senderUsername: string;
  senderId: string;
  userId: string;
  message: string;
  time: Date;
  delivered: boolean;
}[] = [];
const rooms = new Map<string, boolean>();

// 🔌 Socket Events
io.on("connection", (socket) => {
  // console.log("User connected:", socket.id);

  socket.on("goingToHome", (userId) => {
    if(onlineUsers.get(userId) !== null) {
      rooms.set(onlineUsers.get(userId), false);
    }
    onlineUsers.set(userId, null);
    // console.log("Online Users:", onlineUsers);
    // console.log("Rooms:", rooms);
  });


  // Join Room
  socket.on("join-room", ({ roomId, userId, recipientId }) => {
    // console.log("onlineUsers Map before joining room:", onlineUsers);
    // console.log("Pending Messages before joining room:", pendingMessages);
    // console.log("Rooms Map before joining room:", rooms);
    socket.join(roomId);
    onlineUsers.set(userId, roomId);
    rooms.set(roomId, false);

    // console.log("Room ID:", roomId);

    if (
      onlineUsers.get(userId) === roomId &&
      onlineUsers.get(recipientId) === roomId
    ) {
      rooms.set(roomId, true);
    } 

    const pending = pendingMessages.filter((m) => m.userId === userId);

    // remove delivered messages from pendingMessages
    for (let i = pendingMessages.length - 1; i >= 0; i--) {
      // console.log("Checking pending message for removal:", pendingMessages[i]);
      if (
        pendingMessages[i]!.senderId === recipientId && pendingMessages[i]!.userId === userId &&
        !pendingMessages[i]!.delivered
      ) {
        // console.log("Removing delivered message from pendingMessages:", pendingMessages[i]);
        pendingMessages.splice(i, 1);
      }
    }

    // console.log(`User joined room ${roomId}`);
    // console.log("onlineUsers Map after joining room:", onlineUsers);
    // console.log("Pending Messages after joining room:", pendingMessages);
    // console.log("Rooms Map after joining room:", rooms);

    socket.emit("loadMessages", pending);
  });

  // Receive & Broadcast Message
  socket.on(
    "send-message",
    ({ senderId, recipientId, roomId, username, msg }) => {
      console.log(`Message from ${username} in room ${roomId}: ${msg}`);

      // console.log("Online Users Map:", onlineUsers);
      // console.log("Rooms Map:", rooms);

      if (!rooms.get(roomId)) {
        // store in pendingMessages
        pendingMessages.push({
          senderUsername: username,
          senderId: senderId,
          userId: recipientId,
          message: msg,
          time: new Date(),
          delivered: false,
        });
      }

      // console.log("pendingMessages:", pendingMessages);

      io.to(roomId).emit("receive-message", {
        sender: username,
        message: msg,
      });
    },
  );

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

/********* only for server testing *********/
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   // Join Room
//   socket.on("join-room", ({ userId, recipientId }) => {
//     const roomId = [userId, recipientId].sort().join("-");
//     socket.join(roomId);
//     console.log(`User joined room ${roomId}`);
//   });

//   // Receive & Broadcast Message
//   socket.on("send-message", ({ roomId, userId, msg })=>{
//     console.log(`Message from ${userId} in room ${roomId}: ${msg}`);
//     socket.to(roomId).emit("receive-message", {
//       senderId: userId,
//       message: msg
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

server.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
