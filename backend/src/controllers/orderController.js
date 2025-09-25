const axios = require("axios");
const mongoose = require("mongoose");
const SSLCommerzPayment = require("sslcommerz-lts");
const Orders = require("../models/orderModel");
const { storeId, storePass } = require("../../secret");
const { v4: uuidv4 } = require("uuid");

const isLive = false;

exports.placeOrder = async (req, res) => {
  try {
    const { customerData, orderedItems, total } = req.body;

    if (!customerData || typeof customerData !== "object") {
      return res
        .status(400)
        .json({ error: "Customer data is missing or invalid" });
    }

    if (!Array.isArray(orderedItems) || orderedItems.length === 0) {
      return res
        .status(422)
        .json({ error: "orderedItems must be a non-empty array" });
    }

    if (typeof total !== "number" || total <= 0) {
      return res.status(422).json({ error: "Invalid total amount" });
    }

    // Normalize product IDs
    const normalizedItems = orderedItems.map((item) => {
      if (!mongoose.Types.ObjectId.isValid(item.id)) {
        throw new Error(`Invalid product ID: ${item.id}`);
      }
      return {
        ...item,
        id: new mongoose.Types.ObjectId(item.id),
      };
    });

    //Generate transaction ID
    const tran_id = uuidv4();

    const data = {
      total_amount: total,
      currency: "BDT",
      tran_id: tran_id,
      success_url: `http://localhost:4000/api/order/payment/success/${tran_id}`,
      fail_url: `http://localhost:4000/api/order/payment/fail/${tran_id}`,
      cancel_url: `http://localhost:4000/api/order/payment/cancel/${tran_id}`,
      ipn_url: "http://localhost:3000/api/order/payment/ipn",
      shipping_method: "Courier",
      product_name: orderedItems.map((item) => item.name).join(", "),
      product_category: "Ecommerce",
      product_profile: "general",
      cus_name: customerData.fullName,
      cus_email: customerData.email,
      cus_add1: customerData.address,
      cus_add2: "Dhaka",
      cus_city: customerData.city,
      cus_state: customerData.state,
      cus_postcode: customerData.zip,
      cus_country: customerData.country,
      cus_phone: customerData.phone,
      cus_fax: "",
      ship_name: customerData.fullName,
      ship_add1: customerData.address || "Rangpur",
      ship_add2: "",
      ship_city: customerData.city || "",
      ship_postcode: customerData.zip || "",
      ship_country: customerData.country || "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(storeId, storePass, isLive); // false = sandbox
    const apiResponse = await sslcz.init(data);

    const newOrder = new Orders({
      customerData,
      orderedItems: normalizedItems,
      total,
      tran_id,
    });

    await newOrder.save();

    res.status(200).json({
      url: apiResponse.GatewayPageURL,
      tran_id,
    });
  } catch (error) {
    console.error("Order placement failed:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.redirectSuccess = async (req, res) => {
  try {
    const { tran_id } = req.params;

    const order = await Orders.findOneAndUpdate(
      { tran_id },
      { status: "Paid" },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ error: "Transaction not found or already paid." });
    }

    res.redirect(`http://localhost:3000/payment/success/${tran_id}`);
  } catch (error) {
    console.error("Redirect error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Example: /routes/payment.js
exports.redirectFail = async (req, res) => {
  try {
    const { tran_id } = req.params;

    const order = await Orders.findOneAndUpdate(
      { tran_id },
      { status: "Failed" },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ error: "Transaction not found or already paid." });
    }

    res.redirect(`http://localhost:3000/payment/fail/${tran_id}`);
  } catch (error) {
    console.error("Failed to update payment status:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.redirectCancel = async (req, res) => {
  try {
    const { tran_id } = req.params;

    const order = await Orders.findOneAndUpdate(
      { tran_id },
      { status: "Cancelled" },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ error: "Transaction not found or already paid." });
    }

    res.redirect(`http://localhost:3000/payment/cancel/${tran_id}`);
  } catch (error) {
    console.error("Failed to update payment status:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.handleIPN = async (req, res) => {
  const { tran_id, status } = req.body;

  try {
    if (status === "VALID") {
      const pendingOrder = await Orders.findOne({ tran_id });

      if (!pendingOrder) {
        return res.status(404).json({ error: "Pending order not found" });
      }

      const normalizedItems = pendingOrder.orderedItems.map((item) => ({
        ...item,
        id: new mongoose.Types.ObjectId(item.id),
      }));

      const newOrder = await Orders.updateOne(
        { tran_id },
        {
          $set: {
            customerData: pendingOrder.customerData,
            orderedItems: normalizedItems,
            total: pendingOrder.total,
            paymentStatus: "Paid",
            status: "Confirmed",
          },
        },
        { upsert: true }
      );

      await newOrder.deleteOne({ tran_id });
      res.status(200).json({ message: "Order placed successfully" });
    } else {
      res.status(400).json({ error: "Payment failed" });
    }
  } catch (error) {
    console.error("IPN error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//payment controller
exports.makePayment = async (req, res, next) => {
  const cartItems = req.body;
  console.log("cartItems", cartItems);

  try {
    const products = await Product.find({
      _id: { $in: Object.keys(cartItems) },
    });

    const line_items = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: product.new_price * 100, // Convert tk to cents
      },
      quantity: cartItems[product._id],
    }));

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({ error: "Payment session creation failed" });
  }
};

exports.payment = async (req, res, next) => {
  const { token, amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntent.create({
      amount,
      currency: "usd",
      source: token.id,
      automatic_payment_methods: { enabled: true },
      description: "E-commerce purchase",
    });
    res.json({ success: true, paymentIntent });
  } catch (err) {
    next(err);
  }
};

exports.orderItem = async (req, res, next) => {
  console.log(req.body);
};

exports.initPayment = async (req, res) => {
  const { amount, customer_name, customer_email, order_id } = req.body;

  const payload = {
    store_id: storeId,
    store_passwd: storePass,
    total_amount: amount,
    currency: "BDT",
    tran_id: order_id,
    success_url: "http://localhost:3000/payment-success",
    fail_url: "http://localhost:3000/payment-fail",
    cancel_url: "http://localhost:3000/payment-cancel",
    cus_name: customer_name,
    cus_email: customer_email,
    product_category: "Ecommerce",
    product_name: "Cart Items",
    product_profile: "general",
  };

  try {
    const response = await axios.post(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      payload
    );

    if (response.data?.GatewayPageURL) {
      res.json({ url: response.data.GatewayPageURL });
    } else {
      res.status(500).json({ error: "Failed to initiate payment" });
    }
  } catch (err) {
    console.error("SSLCommerz error:", err.message);
    res.status(500).json({ error: "Payment initiation failed" });
  }
};
