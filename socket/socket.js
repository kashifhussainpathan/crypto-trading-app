import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { closeOrder } from "./controllers/socket.controller.js";

const app = express();

dotenv.config();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected");

  socket.on("triggered_orders", async ({ token, orders }) => {
    try {
      for (const order of orders) {
        const { _id, livePrice: profit } = order;

        if (!_id || !profit || !token) {
          console.log("Empty Order");
        } else {
          await closeOrder(_id, profit, token);
        }
      }
    } catch (error) {
      console.log("Error processing triggered orders:", error);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Trading Socket is ON");
});

server.listen(process.env.PORT, () => {
  console.log(`Server is listening to port ${process.env.PORT} `);
});
