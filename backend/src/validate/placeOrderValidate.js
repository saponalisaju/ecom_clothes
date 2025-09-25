const { body } = require("express-validator");

const orderValidation = [
  // Transaction ID
  body("tran_id").trim().notEmpty().withMessage("Transaction ID is required"),

  // Customer Data
  body("customerData.fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),

  body("customerData.email").isEmail().withMessage("Valid email is required"),

  body("customerData.phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

  body("customerData.city").trim().notEmpty().withMessage("City is required"),

  body("customerData.address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 10 })
    .withMessage("Address must be at least 10 characters"),

  body("customerData.paymentMethod")
    .trim()
    .notEmpty()
    .isIn(["online", "cod", "pos"])
    .withMessage("Payment method must be one of: online, cod, pos"),

  body("customerData.termsAccepted")
    .isBoolean()
    .withMessage("Terms acceptance must be a boolean")
    .equals("true")
    .withMessage("Terms must be accepted"),

  // Ordered Items
  body("orderedItems")
    .isArray({ min: 1 })
    .withMessage("At least one ordered item is required"),

  body("orderedItems.*.id").notEmpty().withMessage("Product ID is required"),

  body("orderedItems.*.name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required"),

  body("orderedItems.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),

  body("orderedItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a non-negative number"),

  body("orderedItems.*.subtotal")
    .isFloat({ min: 0 })
    .withMessage("Subtotal must be a non-negative number"),

  // Total
  body("total")
    .isFloat({ min: 0 })
    .withMessage("Total amount must be a non-negative number"),
];

module.exports = orderValidation;
