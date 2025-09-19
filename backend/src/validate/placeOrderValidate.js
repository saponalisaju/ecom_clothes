const { body } = require("express-validator");

const orderValidation = [
  body("orderItems")
    .isArray({ min: 1 })
    .withMessage("Order must contain at least one item"),

  body("shippingAddress")
    .trim()
    .notEmpty()
    .withMessage("Shipping address is required")
    .isLength({ min: 10 })
    .withMessage("Shipping address must be at least 10 characters"),

  body("paymentMethod")
    .trim()
    .notEmpty()
    .withMessage("Payment method is required")
    .isIn(["COD", "CARD", "BKASH", "ROCKET", "NAGAD"])
    .withMessage("Invalid payment method"),

  body("totalAmount")
    .isFloat({ min: 0 })
    .withMessage("Total amount must be non-negative"),

  body("promoCode")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("Promo code must be under 20 characters"),
];

module.exports = orderValidation;
