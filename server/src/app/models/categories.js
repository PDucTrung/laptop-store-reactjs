const mongoose = require("mongoose");

const category = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", category);
