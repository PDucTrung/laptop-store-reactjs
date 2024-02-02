const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Slider = new Schema(
  {
    item_id: {
      type: Object,
      unique: true,
      trim: true,
      require: true,
    },
    product_id: {
      type: String,
      unique: true,
      trim: true,
      require: true,
    },
    title: {
      type: String,
      trim: true,
      require: true,
    },
    images: {
      type: Object,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slider", Slider);
