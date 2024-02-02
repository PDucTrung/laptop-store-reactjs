const mongoose = require("mongoose");

const users = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    birthday: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    cart: {
      type: Array,
      default: [],
    }, state: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", users);
