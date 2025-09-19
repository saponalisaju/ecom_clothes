import React, { useState } from "react";
import api from "../../api"; // your Axios instance

const ReviewForm = ({ productId, customerId, customerName }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) {
      return setMessage("Review cannot be empty.");
    }

    try {
      const res = await api.post("/reviews/add", {
        id: productId,
        customerId,
        name: customerName,
        review,
        customerRating: rating,
      });
      setMessage(res.data.message);
      setReview("");
      setRating(5);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error submitting review.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h4>Write a Review</h4>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Your review..."
        required
      />
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r} Star{r > 1 ? "s" : ""}
          </option>
        ))}
      </select>
      <button type="submit">Submit Review</button>
      {message && <p className="text-feedback">{message}</p>}
    </form>
  );
};

export default ReviewForm;
