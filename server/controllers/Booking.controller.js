const { http } = require("../lib/helper/const");
const Booking = require("../models/booking.model");
const Train = require("../models/train.model");
const User = require("../models/user.model");

const bookSeat = async (req, res) => {
  const { trainId } = req.params;
  const { userId, noOfSeats } = req.body;

  try {
    const train = await Train.findById(trainId);
    if (!train) throw new Error("Train not found");

    if (train.bookedSeats + noOfSeats > train.seatCapacity) {
      return res
        .status(http.INTERNAL_SERVER_ERROR)
        .send({ error: "Not enough seats available" });
    }

    const seatNumbers = [];
    for (let i = 1; i <= train.seatCapacity; i++) {
      if (seatNumbers.length === noOfSeats) break;
      if (!(await Booking.findOne({ trainId, seatNumbers: i }))) {
        seatNumbers.push(i);
      }
    }

    const booking = new Booking({ userId, trainId, noOfSeats, seatNumbers });
    await booking.save();

    train.bookedSeats += noOfSeats;
    await train.save();

    res.status(201).send({
      message: "Seat booked successfully",
      booking_id: booking._id,
      seat_numbers: seatNumbers,
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

const getBookingDetails = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId)
      .populate("trainId")
      .populate("userId");
    if (!booking) throw new Error("Booking not found");

    res.send({
      booking_id: booking._id,
      train_id: booking.trainId._id,
      train_name: booking.trainId.trainName,
      user_id: booking.userId._id,
      no_of_seats: booking.noOfSeats,
      seat_numbers: booking.seatNumbers,
      arrival_time_at_source: booking.trainId.arrivalTimeAtSource,
      arrival_time_at_destination: booking.trainId.arrivalTimeAtDestination,
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = { bookSeat, getBookingDetails };
