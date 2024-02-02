const express = require("express");
const router = express.Router();

const SliderController = require("../app/controllers/SliderController");

router
  .route("/slider")
  .get(SliderController.getSlider)
  .post(SliderController.createSlider); 

router
  .route("/slider/:id")
  .delete(SliderController.deleteSlide)
  
module.exports = router;