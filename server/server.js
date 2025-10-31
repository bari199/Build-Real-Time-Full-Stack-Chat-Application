import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import connectDB from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.io
export const io = new Server(server, {
  cors: { origin: "*" },
});

// Store online users
export const userSocketMap = {}; // { userId: socketId }

// Socket.io connection handling
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("🟢 New client connected:", userId);

  if (userId) userSocketMap[userId] = socket.id;

  // Emit list of online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Middleware setup
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// Routes setup
app.use("/api/status", (req, res) => res.send("Server is live ✅"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect to MongoDB
await connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
