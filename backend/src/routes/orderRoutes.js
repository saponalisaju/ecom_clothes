const express = require("express");
const orderRoutes = express.Router();

const orderController = require("../controllers/orderController");
const orderValidation = require("../validate/placeOrderValidate");
const { runValidation } = require("../validate");

orderRoutes.post(
  "/place_order",
  runValidation,
  orderValidation,
  orderController.placeOrder
);

orderRoutes.get("/payment/success/:tran_id", orderController.redirectSuccess);
orderRoutes.get("/payment/fail/:tran_id", orderController.redirectFail);
orderRoutes.get("/payment/cancel/:tran_id", orderController.redirectCancel);
orderRoutes.post("/payment/success/:tran_id", orderController.redirectSuccess);
orderRoutes.post("/payment/fail/:tran_id", orderController.redirectFail);
orderRoutes.post("/payment/cancel/:tran_id", orderController.redirectCancel);
orderRoutes.post("/payment/ipn", orderController.handleIPN);

orderRoutes.post("/create-payment-intent", orderController.payment);
orderRoutes.post("/make_payment", orderController.makePayment);
orderRoutes.post("/order_item", orderController.orderItem);

module.exports = orderRoutes;
