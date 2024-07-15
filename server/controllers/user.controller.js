require("dotenv").config({ silent: true });
const {
  hashedPassword,
  validatePassword,
  comparePassword,
  generateAccessToken,
  generateRereshToken,
} = require("../lib/helper/common");
const { http } = require("../lib/helper/const");
const User = require("../models/user.model");

//SecretKey for generating access token
const { secreteAccessKey, secreteRefreshKey } = require("../lib/config");

// getAll Users detail
exports.getAllUsers = async (req, res) => {
  try {
    // get all user details, avoid to send password;
    const user = await User.find({}, { password: 0 });

    // if there is no user
    if (!user || user.length === 0) {
      res.status(http.NOT_FOUND).send({
        msg: "No user found",
        totalUser: user.length,
        user,
      });
      return;
    }

    // all user details
    res.status(http.OK).send({
      msg: "Success",
      totalUser: user.length,
      user,
    });
  } catch (error) {
    console.error("Error fetching User:", error);
    res.status(http.INTERNAL_SERVER_ERROR).send({ msg: "Error", error });
  }
};

//register a new instructor
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let isExistUser = await User.findOne({ email }, {});

    //check User is already register or not
    if (isExistUser) {
      res.status(http.CONFLICT).send({
        msg: "error",
        error: `User with the email ${email} already registered.`,
      });
      return;
    }

    // password validator
    let isPasswordValidate = validatePassword(password);

    //if password is not strong throw the error
    if (!isPasswordValidate) {
      res.status(http.BAD_REQUEST).send({
        msg: "Please create strong password",
        error:
          "Password must contain at least 8 characters, 1 capital letter, 1 number, and 1 special character",
      });
    } else {
      // User details take it out from req.body
      let userDetails = { ...req.body };

      //Hashed the User password before saving database
      userDetails.password = hashedPassword(userDetails.password);

      //save the user details on mongoDB.
      const createUser = new User(userDetails);
      await createUser.save();

      //send the response to user after account is created.
      res.status(http.CREATED).send({
        status: "Account successfully created",
        user_id: createUser._id,
      });
    }
  } catch (error) {
    // Throw an error message
    res.status(http.BAD_REQUEST).send({ msg: "error from catch block", error });
  }
};

// Login for user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const UserDetails = await User.findOne({ email });

    //check user is registered or not
    if (!UserDetails) {
      res.status(http.NOT_FOUND).send({
        msg: "error",
        error: "Incorrect username/password provided. Please retry",
      });
      return;
    }

    //check user enter correct password or not
    let isPasswordMatched = comparePassword(password, UserDetails.password);

    if (!isPasswordMatched) {
      res
        .status(http.UNAUTHORIZED)
        .send({ msg: "error", error: "Please enter correct password" });
      return;
    }
    const payload = {
      userId: UserDetails.id,
      email: UserDetails.email,
      role: UserDetails.role,
    };

    //generate the access token
    let accessToken = generateAccessToken(payload, secreteAccessKey);

    // if accessToken is not generated throw a error message.
    if (!accessToken) {
      res
        .status(http.INTERNAL_SERVER_ERROR)
        .send({ msg: "error", error: "failed to generate accessToken" });
      return;
    }

    //generate the refresh token
    let refreshToken = generateRereshToken(payload, secreteRefreshKey);

    // if refreshToken is not generated throw a error message.
    if (!refreshToken) {
      res
        .status(http.INTERNAL_SERVER_ERROR)
        .send({ msg: "error", error: "failed to generate refreshToken" });
      return;
    }
    // send access and refresh token to client
    res.status(http.OK).send({
      msg: "Login successful",
      user_id: UserDetails._id,
      access_token: accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(http.BAD_REQUEST).send({ msg: "error", error });
  }
};
