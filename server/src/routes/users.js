const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");
const UserController = require("../app/controllers/UsersController");

router.post("/register", UserController.register);

router.post("/registerGG", UserController.registerWithGG);

router.post("/login", UserController.login);

router.post("/loginGG", UserController.loginWithGG);

router.get("/logout", UserController.logout);

router.get("/getall",auth,authAdmin, UserController.getAllUser);

router.get("/refresh_token", UserController.refreshToken);

router.get("/infor",auth,UserController.getUser);

router.patch("/addcart",auth,UserController.addToCart);

router.get("/history",auth,UserController.history);

router.get("/historyCheckout",auth,UserController.historyCheckout);

router.patch("/update/:id",auth,UserController.update);

router.put("/repassword",auth,UserController.repassword);

router.put("/setpassword",UserController.setpassword);
router.get("/:id", auth, authAdmin, UserController.getItem);

module.exports = router;
