const express = require("express");
const orderRoutes = express.Router();

const orderController = require("../controllers/orderController");
const orderValidation = require("../validate/placeOrderValidate");

orderRoutes.post("/checkout", orderValidation, orderController.placeOrder);
orderRoutes.post("/payment", orderController.payment);

module.exports = orderRoutes;
