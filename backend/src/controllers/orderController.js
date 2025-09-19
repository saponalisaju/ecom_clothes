const CheckUsers = require("../models/orderModel");
const Stripe = require("stripe");
const stripe = Stripe("../../secret.js");

const Order = require("../models/orderModel");

exports.placeOrder = async (req, res) => {
  try {
    const { cartItems, shippingAddress, paymentMethod, totalAmount } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "No order items provided." });
    }

    const newOrder = new Order({
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
      user: req.user._id,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({
      message: "Order placed successfully!",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Order placement error:", error);
    res
      .status(500)
      .json({ error: "Failed to place the order. Please try again." });
  }
};

//payment controller

exports.payment = async (req, res, next) => {
  const { token, amount } = req.body;
  try {
    const charge = await stripe.charges.create({
      amount,
      currency: "usd",
      source: token.id,
      description: "E-commerce purchase",
    });
    res.json({ success: true, charge });
  } catch (err) {
    next(err);
  }
};
