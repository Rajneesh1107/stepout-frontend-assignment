const {
  bookSeat,
  getBookingDetails,
} = require("../../controllers/Booking.controller");
const auth = require("../../middleware/auth.middleware");

module.exports = (app) => {
  app.get("/api/trains/:bookingId", auth, getBookingDetails);
  app.post("/api/trains/:trainId/book", auth, bookSeat);
};
