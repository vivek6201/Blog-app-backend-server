const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.DB_URL;

const dbConnect = async (req, res) => {
  try {
    await mongoose.connect(dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DB Connected Successfully.");
  } catch (err) {
    console.error(err.message);
    console.log("error in DB connection.")
    process.exit(1);
  }
};

module.exports = dbConnect;