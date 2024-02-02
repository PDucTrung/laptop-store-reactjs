const User = require("../models/users");
const Payment = require("../models/payment");
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
const PaymentController = {
  getPayment: async (req, res) => {
    try {
      const features = new APIfeatures(Payment.find(), req.query)
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

        const { cart, id, payer, purchase_units } = req.body;

      const { _id, name, email } = user;

      const newPayment = new Payment({
        user_id: _id,
        name,
        email,
        cart,
        id,
        payer,
        purchase_units,
      });

      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });

      await newPayment.save();

      res.json({ mgs: "Thanh toán thành công." });
    } catch (error) {
      res.status(500).json({ mgs: error.message });
    }
  },
};

const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate({ _id: id }, { sold: quantity + oldSold });
};

module.exports = PaymentController;
