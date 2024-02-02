const mongoose = require("mongoose");

const paymentCheckout = new mongoose.Schema(
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
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    derivery: {
      type: String,
      require: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    status: {
      type: Boolean,
      default: false,
    },
    userId: Object,
    state: String,
    reason: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("paymentCheckout", paymentCheckout);
