const express = require("express");

const couponController = require("../controllers/couponController");
// const { isLoggedIn } = require("../middlewares/auth");
const promoCodeValidator = require("../validate/validateCoupon");

const couponRouter = express.Router();

couponRouter.post(
  "/create",
  //   isLoggedIn,
  promoCodeValidator,
  couponController.createCoupon
);
couponRouter.get("/get_coupon", couponController.getCoupon);

module.exports = couponRouter;
