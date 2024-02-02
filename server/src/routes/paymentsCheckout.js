const express = require("express");
const router = express.Router();

const PaymentsCheckoutController = require("../app/controllers/PaymentsCheckout");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

router
  .route("/paymentsCheckout")
  .get(auth, authAdmin, PaymentsCheckoutController.getPayment)
  .post(auth, PaymentsCheckoutController.createPayment);

router
  .route("/paymentsCheckout/:id")
  .put(auth, PaymentsCheckoutController.editState);

module.exports = router;
