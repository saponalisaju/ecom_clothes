const { body } = require("express-validator");

const validationAdminRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required. Enter your fullname")
    .isLength({ min: 4, max: 31 })
    .withMessage("Name should be at least 4-24 character long"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required. Enter your phone number"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email address")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required. Enter your password")
    // .matches(
    //   /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    // )
    .withMessage(
      "Password minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
];

const validateAdminLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email address")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required. Enter your password")
    // .matches(
    //   /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    // )
    .withMessage(
      "Password minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
];

const validateUpdatePassword = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email address")
    .isEmail()
    .withMessage("Invalid email"),

  body("oldPassword")
    .trim()
    .notEmpty()
    .withMessage("Old Password is required. Enter your old Password")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("New Password is required. Enter your new Password")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),

  body("confirmedPassword").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Password did not match");
    }
    return true;
  }),
];

const validateForgetPassword = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email address")
    .isEmail()
    .withMessage("Invalid email"),
];

const validateResetPassword = [
  body("token").trim().notEmpty().withMessage("Token is missing"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("New Password is required. Enter your new Password")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
];

module.exports = {
  validationAdminRegister,
  validateAdminLogin,
  validateUpdatePassword,
  validateForgetPassword,
  validateResetPassword,
};
