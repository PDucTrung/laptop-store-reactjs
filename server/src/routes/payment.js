const express = require("express");
const router = express.Router();

const paymentController = require("../app/controllers/Payment");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router.route('/payment')
   .get(auth,authAdmin,paymentController.getPayment)
   .post(auth,paymentController.createPayment)

module.exports = router;
