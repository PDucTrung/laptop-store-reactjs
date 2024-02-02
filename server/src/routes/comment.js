const express = require("express");
const router = express.Router();
const CommentController = require("../app/controllers/CommentController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router
  .route("/comment")
  // .get(CommentController.getComments)
  .post(CommentController.createComment);

router
  .route("/comment/:id")
  .delete(auth, authAdmin, CommentController.deleteComment)
  .put(CommentController.editComment)
  .get(CommentController.getComments);

module.exports = router;
