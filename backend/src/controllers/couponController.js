const { validationResult } = require("express-validator");
const Coupon = require("../models/couponModel");

exports.createCoupon = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newCoupon = await Coupon.create(req.body);
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.validateCoupon = async (req, res) => {
  const { code } = req.body;
  const coupon = await Coupon.findOne({ code });

  if (!coupon) {
    return res.status(400).json({ valid: false, message: "Invalid code" });
  }
  if (coupon.expiresAt < Date.now()) {
    return res.status(400).json({ valid: false, message: "Code expired" });
  }

  return res.json({ valid: true, discount: coupon.discount });
};

exports.getCoupon = async (req, res, next) => {
  const { code } = req.body;

  if (!code || typeof code !== "string") {
    return res.status(400).json({ valid: false, message: "Invalid Input." });
  }
  try {
    const promo = await Coupon.findOne({ code: code.trim().toLowerCase() });
    if (
      !promo ||
      !promo.isActive ||
      (promo.expiresAt && promo.expiresAt < new Date())
    ) {
      return res
        .status(401)
        .json({ valid: false, reason: "Expired and inactive promo code" });
    }

    return res.json({ valid: true, discount: promo.discount });
  } catch (error) {
    console.error("Promo validation error", error);
    return res.status(500).json({ valid: false, message: "Server error" });
  }
};
