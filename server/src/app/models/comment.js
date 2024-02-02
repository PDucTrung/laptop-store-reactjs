const mongoose = require("mongoose");

const comment = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    productId: {
      type: String,
      require: true,
    },
    userId: {
      type: Object,
      require: true,
    },
    likes: Number,
    rating: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comment", comment);
