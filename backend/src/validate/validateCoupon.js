const { body } = require("express-validator");

const promoCodeValidator = [
  body("code")
    .exists({ checkFalsy: true })
    .withMessage("Promo code is required")
    .bail() // Stop if 'exists' fails
    .isLength({ min: 4, max: 15 })
    .withMessage("Promo code must be 4–15 characters")
    .bail()
    .matches(/^[A-Z0-9]+$/)
    .withMessage("Promo code must be uppercase alphanumeric")
    .trim()
    .toUpperCase(),

  body("discount")
    .exists({ checkFalsy: true })
    .withMessage("Discount value is required")
    .bail()
    .isInt({ min: 1, max: 100 })
    .withMessage("Discount must be between 1 and 100"),

  body("expires")
    .optional()
    .isISO8601()
    .withMessage("Expiration must be a valid date")
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error("Expiration date must be in the future");
      }
      return true;
    }),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
];

module.exports = promoCodeValidator;
