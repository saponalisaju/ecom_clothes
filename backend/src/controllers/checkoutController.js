const { default: Order } = require("../models/orderModel");

exports.checkoutData = async (req, res) => {
  try {
    const checkout = new Order(req.body);
    await checkout.save();
    res.status(200).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ error: "Failed to place order." });
  }
};
