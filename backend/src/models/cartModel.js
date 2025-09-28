const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema(
  {
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Variant",
    },
    size: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL"],
      required: false,
    },
    color: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  { _id: false }
);

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    priceAtAdd: {
      type: Number,
      required: false,
    },
    variant: {
      type: variantSchema,
      default: {},
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "pending", "abandoned", "completed"],
      default: "active",
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Optional TTL index for auto-expiry cleanup
cartSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
