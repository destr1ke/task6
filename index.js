import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import messages from "./routes/messages.js";
import { WebSocketServer } from "ws";
import http from "http";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

export let connectedClients = [];

wss.on("connection", (ws) => {
  connectedClients.push(ws);

  ws.on("close", () => {
    connectedClients = connectedClients.filter((client) => client !== ws);
  });
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/api/messages", messages);

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

async function startServer() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the database");

    server.listen(process.env.PORT || 5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
  }
}

startServer();
