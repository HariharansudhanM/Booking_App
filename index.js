import express from "express";
import { roomRoute } from "./routes/RoomRoute.js";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";

// Connection URL
const app = express();
app.use(express.json());
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongodb is connected");
  return client;
}

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use("/Rooms", roomRoute);

app.listen(PORT, () => {
  console.log("server kickStarted");
});

export const client = await createConnection();
