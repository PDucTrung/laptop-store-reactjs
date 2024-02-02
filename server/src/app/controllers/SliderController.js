const Slider = require("../models/slider");

const SliderController = {
  getSlider: async (req, res) => {
    try {
      const slider = await Slider.find();
      res.json({
        status: "success",
        result: slider.length,
        slider,
      });
    } catch (error) {
      return res.status(500).json({ mgs: error.message });
    }
  },
  createSlider: async (req, res) => {
    try {
      const { item_id, product_id, title, images } = req.body;
      const slide = await Slider.findOne({ item_id });
      if (slide)
        return res.status(400).json({ msg: "Sản phẩm này đã được chọn." });
      const newSlider = new Slider({
        item_id,
        product_id,
        title,
        images,
      });

      await newSlider.save();
      res.json({ mgs: "Đã tạo một slide" });
    } catch (error) {
      return res.status(500).json({ mgs: error.message });
    }
  },
  deleteSlide: async (req, res) => {
    try {
      await Slider.findByIdAndDelete(req.params.id);
      res.json({ mgs: "Đã xóa một slide" });
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
        }
      );
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

module.exports = SliderController;
