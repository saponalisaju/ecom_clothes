const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const OrderedItemSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    tran_id: {
      type: String,
      required: true,
      unique: true,
    },
    customerData: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String, required: true },
      address: { type: String, required: true },
      state: { type: String },
      zip: { type: String },
      country: { type: String, default: "BANGLADESH" },
      deliveryDate: { type: Date },
      deliveryRoute: { type: String },
      paymentMethod: {
        type: String,
        enum: ["online", "cod", "pos"],
        required: true,
      },
      termsAccepted: { type: Boolean, required: true },
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Cancelled", "Delivered"],
      default: "Pending",
    },

    orderedItems: [OrderedItemSchema],
    total: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

const Orders = mongoose.model("Order", OrderSchema);

module.exports = Orders;
