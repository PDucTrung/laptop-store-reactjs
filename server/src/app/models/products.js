const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

const Products = new Schema(
  {
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
    price: {
      type: Number,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      require: true,
    },
    images: {
      type: Object,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
    color:{
      type:String,
      require:true,
    },
    service:{
      type:String,
      require:true
    },
    salePercen: {
      type: Number,
      default: 0,
    },
    remain:{
      type:Number,
      default:true
    }
  },
  { timestamps: true }
);

// const mongoose_delete = require("mongoose-delete");
// Products.plugin(mongoose_delete, {
//   deleteAt: true,
// });

module.exports = mongoose.model("Products", Products);
