const mongoose = require("mongoose");
require("dotenv").config();
async function connect() {
  try {
    await mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("connect succesfully");
  } catch (error) {
    console.log("connect failruly");
  }
}
module.exports = { connect };
