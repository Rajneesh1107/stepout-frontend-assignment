// Import required packages
require("dotenv").config({ silent: true });

module.exports = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  saltRounds: process.env.SALT_ROUND,
  secreteAccessKey: process.env.SECRET_ACCESS_KEY_USER,
  secreteRefreshKey: process.env.SECRET_REFRESH_KEY_USER,
  email: process.env.EMAIL,
  emailPassword: process.env.EMAIL_PASSWORD,
};
