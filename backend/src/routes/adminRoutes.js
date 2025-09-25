const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");

const { isLoggedOut, isLoggedIn } = require("../middlewares/auth");
const {
  validationAdminRegister,
  validateAdminLogin,
} = require("../validate/validateAdmin");

adminRouter.post(
  "/admin_register",
  isLoggedOut,
  validationAdminRegister,
  adminController.adminRegister
);
adminRouter.post(
  "/admin_login",
  isLoggedOut,
  validateAdminLogin,
  adminController.adminLogin
);

adminRouter.post(
  "/logout",
  isLoggedIn,
  adminController.loginLimiter,
  adminController.logout
);

module.exports = adminRouter;
