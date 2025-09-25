const mongoose = require("mongoose");

const CheckoutSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    country: {
      type: String,
      default: "BANGLADESH",
    },
    deliveryDate: {
      type: Date,
    },
    deliveryRoute: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ["online", "cod", "pos"],
      required: true,
    },
    termsAccepted: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Checkout = mongoose.model("Checkout", CheckoutSchema);
module.exports = Checkout;
