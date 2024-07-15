const mongoose = require("mongoose");

const trainSchema = new mongoose.Schema(
  {
    trainNumber: {
      type: Number,
      required: [true, "Train Number is required"],
    },
    trainName: { type: String, required: [true, "Train name is required"] },
    source: {
      type: String,
      required: [true, "Train source station name is required"],
    },
    destination: {
      type: String,
      required: [true, "Train source destination name is required"],
    },
    seatCapacity: {
      type: Number,
      required: [true, "Train seat capacity is required"],
    },
    bookedSeats: { type: Number, default: 0 },
    arrivalTimeAtSource: {
      type: String,
      required: [true, "Train arrival at source station time is required"],
    },
    arrivalTimeAtDestination: {
      type: String,
      required: [true, "Train arrival at Destination station time is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Train", trainSchema);
