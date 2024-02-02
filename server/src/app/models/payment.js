const mongoose = require("mongoose");

const payment = new mongoose.Schema(
  {
    user_id: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    id: {
      type: String,
      require: true,
    },
    payer: {
      type: Object,
      require: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    purchase_units: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("payment", payment);
