const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId required "],
  },
  trainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train",
    required: [true, "trainId for train"],
  },
  noOfSeats: {
    type: Number,
    required: [true, "Please provide no. of booking seat"],
  },
  seatNumbers: { type: [Number], required: [true, " Seat no is required"] },
});

module.exports = mongoose.model("Booking", bookingSchema);
