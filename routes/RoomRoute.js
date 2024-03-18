import express from "express";
import { client } from "../index.js";

const router = express.Router();

router.post("/createRoom", async (req, res) => {
  const roomData = req.body;
  console.log(roomData);
  const result = await client
    .db("BookingApp")
    .collection("Rooms")
    .insertOne(roomData);

  res.send(result);
});

router.get("/", async (req, res) => {
  const result = await client
    .db("BookingApp")
    .collection("Rooms")
    .find({})
    .toArray();

  res.send(result);
});

router.put("/book/:id", async (req, res) => {
  const { id } = req.params;
  const bookingdata = req.body;
  //   console.log(bookingdata);

  const existingData = await client
    .db("BookingApp")
    .collection("Rooms")
    .find({ id: id })
    .toArray();

  //   console.log(existingData);
  //   console.log(bookingdata);

  if (existingData[0].Status == "Booked") {
    const compare = existingData[0].Bookings.find(
      (e) => e.startTime == bookingdata.Bookings[0].startTime
    );
    if (compare != undefined) {
      res.send({ message: "Room is occupied" });
      return;
    }

    const result = await client
      .db("BookingApp")
      .collection("Rooms")
      .updateOne({ id: id }, { $set: bookingdata });

    res.send({ message: "operation successful", result });
  }
});

export const roomRoute = router;
