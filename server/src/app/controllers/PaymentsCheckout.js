const User = require("../models/users");
const paymentsCheckout = require("../models/paymentsCheckout");
const Products = require("../models/products");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString }; // queryString=req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((element) => delete queryObj[element]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const PaymentsCheckOutController = {
  getPayment: async (req, res) => {
    try {
      const features = new APIfeatures(paymentsCheckout.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      const payments = await features.query;
      res.json({
        status: "success",
        result: payments.length,
        payments,
      });
    } catch (error) {
      res.status(500).json({ mgs: error.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("name email");
      if (!user)
        return res.status(400).json({ mgs: "Tài khoản không tồn tại." });

      const { cart, derivery, address, phone, state } = req.body;

      const { _id, name, email } = user;

      const newPayment = new paymentsCheckout({
        user_id: _id,
        name,
        email,
        cart,
        address,
        derivery,
        phone,
        state,
        userId: user,
      });
   
      await newPayment.save();

      res.json({ mgs: "Đặt hàng thành công." });
    } catch (error) {
      res.status(500).json({ mgs: error.message });
    }
  },
  editState: async (req, res) => {
    try {
      await paymentsCheckout.findOneAndUpdate({ _id: req.body._id }, { ...req.body });
      if (req.body.state === "SUCCESS") {
        req.body.cart.filter((item) => {
          return sold(item._id, item.quantity, item.sold);
        });
        req.body.cart.filter((item) => {
          return remain(item._id, item.remain, item.quantity);
        });
      }
      res.json({ ...req.body });
    } catch (error) {
      return res.status(500).json({ mgs: error.message });
    }
  },
};
const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate({ _id: id }, { sold: quantity + oldSold });
};
const remain = async (id, remain, quantity) => {
  await Products.findOneAndUpdate({ _id: id }, { remain: remain - quantity });
};
module.exports = PaymentsCheckOutController;
