const {
  loginUser,
  getAllUsers,
  registerUser,
} = require("../../controllers/user.controller");

module.exports = (app) => {
  app.get("/api/users", getAllUsers);
  app.post("/api/register", registerUser);
  app.post("/api/login", loginUser);
};
