const {
  addTrain,
  getTrainAvailability,
} = require("../../controllers/Train.controller");
const auth = require("../../middleware/auth.middleware");
const accessCheck = require("../../middleware/authorize.middleware");

module.exports = (app) => {
  //this route return all the available train between two destination;
  app.get("/api/trains/availability", auth, getTrainAvailability);

  // adding new trains
  app.post("/api/trains/create", auth, accessCheck(["admin"]), addTrain);
};
