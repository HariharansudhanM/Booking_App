import express from "express";
import { client } from "../index.js";

const router = express.Router();

router.post("/createRoom", async (req, res) => {
  const roomData = req.body;
  console.log(roomData);

  const totalRooms = await client
    .db("BookingApp")
    .collection("Rooms")
    .find({})
    .toArray();

  const id = totalRooms.length + 1;
  roomData["id"] = id;

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
  const Id = Number(id);
  console.log(Id);
  const existingData = await client
    .db("BookingApp")
    .collection("Rooms")
    .find({ id: Id })
    .toArray();

  console.log(existingData);
  // console.log(bookingdata);

  if (existingData[0].Status == "Booked") {
    const compare = existingData[0].Bookings.find(
      (e) => e.startDate == bookingdata.Bookings[0].startDate
    );
    console.log(compare);
    if (compare != undefined) {
      res.send({ message: "Room is occupied" });
    } else {
      bookingdata["Status"] = "Booked";
      const result = await client
        .db("BookingApp")
        .collection("Rooms")
        .updateOne({ id: Id }, { $set: bookingdata });
      res.send({ message: "Rooms booked", result });
    }
  } else {
    bookingdata["Status"] = "Booked";
    const result = await client
      .db("BookingApp")
      .collection("Rooms")
      .updateOne({ id: Id }, { $set: bookingdata });

    res.send({ message: "Rooms booked", result });
  }
});

export const roomRoute = router;
