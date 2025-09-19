const Review = require("../models/reviewModel");

exports.addReview = async (req, res, next) => {
  const {
    id: productId,
    name: customerName,
    customerId,
    review,
    customerRating,
  } = req.body;

  if (
    !productId ||
    !customerId ||
    !customerName ||
    !review ||
    !customerRating
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (typeof review !== "string" || review.trim().length === 0) {
    return res.status(400).json({ message: "Review text cannot be empty" });
  }

  try {
    const existing = await Review.findOne({ productId, customerId });
    if (existing) {
      return res
        .status(409)
        .json({ message: "You have already reviewed this product." });
    }

    const newReview = new Review({
      productId,
      customerName,
      customerId,
      review,
      customerRating,
    });

    await newReview.save();

    res.status(201).json({
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    console.error("Error adding review", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
