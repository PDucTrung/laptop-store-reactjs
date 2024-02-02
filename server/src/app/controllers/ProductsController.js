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
    const limit = this.queryString.limit * 1 || 12;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const ProductsController = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      const products = await features.query;
      res.json({
        status: "success",
        result: products.length,
        products,
      });
    } catch (error) {
      return res.status(500).json({ mgs: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
        salePercen,
        color,
        service,
        remain,
      } = req.body;
      if (!images) return res.status(400).json({ mgs: "Không có ảnh upload" });

      const product = await Products.findOne({ product_id });
      if (product) return res.status(400).json({ msg: "Sản phẩm đã tồn tại." });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
        color,
        salePercen,
        service,
        remain,
      });

      await newProduct.save();
      res.json({ mgs: "Đã tạo một sản phẩm" });
    } catch (error) {
      return res.status(500).json({ mgs: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ mgs: "Đã xóa một sản phẩm" });
    } catch (error) {
      return res.status(500).json({ mgs: error.message });
    }
  },
  editProduct: async (req, res) => {
    try {
      const {
        title,
        price,
        description,
        content,
        images,
        category,
        color,
        salePercen,
        service,
        remain,
      } = req.body;
      if (!images) return res.status(400).json({ mgs: "không ảnh upload" });
      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
          color,
          salePercen,
          service,
          remain,
        }
      );
      res.json({ mgs: "Đã cập nhật một sản phẩm" });
    } catch (error) {
      return res.status(500).json({ mgs: error.message });
    }
  },
  editStatus: async (req, res) => {
    try {
      await Products.findOneAndUpdate({_id:req.body.id},{status:req.body.status});
      res.json({ mgs: "Đã cập nhật một sản phẩm" });
    } catch (error) {
      return res.status(500).json({ mgs: error.message });
    }
  },
  getItem: async (req, res) => {
    const product = await Products.findById(req.params.id);
    res.json(product);
    res.json({ mgs: "get a item" });
  },
};

module.exports = ProductsController;
