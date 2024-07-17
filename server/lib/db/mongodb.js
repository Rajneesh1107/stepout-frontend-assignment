const mongoose = require("mongoose");
const { mongoUri } = require("../config");

const connection = async () => {
  try {
    // if mongoUri is not correct throw error
    if (!mongoUri) {
      throw new Error("failed to connect with mongoDB");
    }
    await mongoose.connect(mongoUri);
    console.log("😊✨ server is Connected to the database! ✨😊");
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = connection;
