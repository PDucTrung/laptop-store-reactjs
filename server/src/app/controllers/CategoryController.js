const Category = require("../models/categories");
const Products = require("../../app/models/products");

const category = {
  getCategory: async (req, res) => {
    try {
      const categories=await Category.find()
      res.json(categories);
    } catch (error) {
      res.status(500).json({ mgs: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      //chỉ admin mới có thể thêm ,sửa ,xóa category
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ mgs: "Loại mặt hàng này đã tồn tại." });

      const newCategory = new Category({ name });
      await newCategory.save();

      res.json({ mgs: "Thêm loại sản phẩm thành công." });
    } catch (error) {
      res.status(500).json({ mgs: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const product = await Products.findOne({ category: req.params.id });
      if (product)
        return res
          .status(400)
          .json({ mgs: "Vui lòng xóa tất cả các sản phẩm có mối quan hệ." });

      await Category.findByIdAndDelete(req.params.id);
      res.json({ mgs: "Đã xóa một loại mặt hàng." });
    } catch (error) {
      res.status(500).json({ mgs: error.message });
    }
  },
  editCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: req.params.id }, { name });
      res.json({ mgs: "Đã cập nhật một loại mặt hàng." });
    } catch (error) {
      res.status(500).json({ mgs: error.message });
    }
  },
};

module.exports = category;
