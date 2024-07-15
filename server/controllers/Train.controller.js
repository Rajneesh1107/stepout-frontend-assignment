const { http } = require("../lib/helper/const");
const Train = require("../models/train.model");

// adding new train to db
exports.addTrain = async (req, res) => {
  const {
    trainName,
    source,
    destination,
    seatCapacity,
    arrivalTimeAtSource,
    arrivalTimeAtDestination,
    bookedSeats,
    trainNumber,
  } = req.body;

  try {
    const train = new Train({
      trainName,
      source,
      destination,
      seatCapacity,
      arrivalTimeAtSource,
      arrivalTimeAtDestination,
      bookedSeats,
      trainNumber,
    });
    await train.save();
    res
      .status(http.CREATED)
      .send({ message: "Train added successfully", train_id: train._id });
  } catch (err) {
    res.status(http.BAD_REQUEST).send(err);
  }
};

exports.getTrainAvailability = async (req, res) => {
  const { source, destination } = req.query;
  console.log(source, destination);
  try {
    let trains = await Train.find({ source, destination });

    res.status(http.ACCEPTED).send({
      msg: "success",
      totalTrains: trains.map((train) => {
        return {
          train_id: train._id,
          train_name: train.trainName,
          available_seats: +train.seatCapacity - +train.bookedSeats,
        };
      }),
    });
  } catch (e) {
    res.status(http.BAD_REQUEST).send(e);
  }
};
