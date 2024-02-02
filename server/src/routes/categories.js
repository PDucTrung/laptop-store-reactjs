const express = require("express");
const router = express.Router();
const CategoryController = require("../app/controllers/CategoryController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router
  .route("/category")
  .get(CategoryController.getCategory)
  .post(auth, authAdmin, CategoryController.createCategory);

router
  .route("/category/:id")
  .delete(auth, authAdmin, CategoryController.deleteCategory)
  .put(auth, authAdmin, CategoryController.editCategory);

module.exports = router;
