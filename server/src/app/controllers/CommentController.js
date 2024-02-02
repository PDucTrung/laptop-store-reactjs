const Comment = require("../models/comment");
const User = require("../../app/models/users");
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
const comment = {
  getComment: async (req, res) => {
    const news = await Comment.findById(req.params.id);
    res.json(news);
    res.json({ mgs: "get a item" });
  },
  getComments: async (req, res) => {
    try {
      // const comment = await Comment.find({ productId: req.params.id });
      const allComment =await Comment.find({ productId: req.params.id });
      const features = new APIfeatures(
        Comment.find({ productId: req.params.id }),
        req.query
      )
        .filtering()
        .sorting()
        .paginating();
      const comments = await features.query;
      res.json({
        status: "success",
        total: allComment.length,
        comments,
      });
    } catch (error) {
      return res.status(500).json({ mgs: error.message });
    }
  },
  createComment: async (req, res) => {
    try {
      //chỉ admin mới có thể thêm ,sửa ,xóa category
      const { content, userId, productId, likes,rating } = req.body;
      const newComment = new Comment({ content, userId, productId, likes,rating });
      await newComment.save();

      res.json({ mgs: "Thêm bình luận thành công." });
    } catch (error) {
      res.status(500).json({ mgs: error.message });
    }
  },
  deleteComment: async (req, res) => {
    try {
      await Comment.findByIdAndDelete(req.params.id);
      res.json({ mgs: "Đã xóa một bình luận." });
    } catch (error) {
      res.status(500).json({ mgs: error.message });
    }
  },
  editComment: async (req, res) => {
    try {
      const { content, productId, userId, likes,rating } = req.body;
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        { content, productId, userId, likes,rating }
      );
      res.json({ mgs: "succes" });
    } catch (error) {
      res.status(500).json({ mgs: error.message });
    }
  },
};

module.exports = comment;
