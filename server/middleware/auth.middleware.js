require("dotenv").config({ silent: true });
const { verifyAccessToken } = require("../lib/helper/common");
const { http } = require("../lib/helper/const");
const User = require("../models/user.model");
let { secreteAccessKey } = require("../lib/config");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(http.BAD_REQUEST).send({
        msg: "error",
        error: "Please send access token",
      });
    }

    if (!secreteAccessKey) {
      return res.status(http.INTERNAL_SERVER_ERROR).send({
        msg: "error",
        error: "secret key configuration missing",
      });
    }
    let decoded = verifyAccessToken(token, secreteAccessKey);
    if (!decoded) {
      return res.status(http.UNAUTHORIZED).send({
        msg: "error",
        error: "Token is invalid, please login again!",
      });
    }

    let user = await User.findOne({ _id: decoded.userId }, { password: 0 });

    // If user not found in User collection, throw an error
    if (!user) {
      return res.status(http.UNAUTHORIZED).send({
        msg: "error",
        error: "User is not authorized to access this route",
      });
    }
    req.body = { ...req.body, ...decoded };
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    res.status(http.INTERNAL_SERVER_ERROR).send({ msg: "error", error });
  }
};

module.exports = auth;
