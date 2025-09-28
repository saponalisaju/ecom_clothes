const express = require("express");
const { fetch_user } = require("../controllers/userController");
const cartRouter = express.Router();
const cartController = require("../controllers/cartController");

cartRouter.post("/add_to_cart", fetch_user, cartController.add_to_cart);
cartRouter.get("/get_cart", fetch_user, cartController.get_cart);
cartRouter.put("/update_cart", fetch_user, cartController.update_cart);
cartRouter.delete(
  "/remove_from_cart",
  fetch_user,
  cartController.remove_from_cart
);

module.exports = cartRouter;
