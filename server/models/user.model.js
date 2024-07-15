const mongoose = require("mongoose");

// Define schema for User
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter your uername"],
      unique: true,
    },
    password: { type: String, required: [true, "Please enter your password"] },
    email: {
      type: String,
      required: [true, "Please enter your password"],
      unique: true,
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    avatar: {
      type: String,
      default:
        "https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png",
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
