const mongoose = require("mongoose");

const productReviewsSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      ref: "Product",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      ref: "User",
      required: true,
    },
    review: {
      type: String,
      required: [true, "Review text is required"],
      validate: {
        validator: function (v) {
          return v.trim().length > 0;
        },
        message: "Review cannot be empty",
      },
    },
    customerRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

productReviewsSchema.index({ productId: 1 });

const Review = mongoose.model("Review", productReviewsSchema);
module.exports = Review;
