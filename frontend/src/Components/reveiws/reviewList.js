import React, { useEffect, useState } from "react";
import api from "../../api";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get(`/reviews/product/${productId}`);
        setReviews(res.data.reviews);
      } catch (err) {
        console.error("Error fetching reviews", err);
      }
    };
    fetchReviews();
  }, [productId]);

  return (
    <div className="review-list">
      <h4>Customer Reviews</h4>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} className="review-item">
            <strong>{r.customerName}</strong>
            <span>{r.customerRating} ★</span>
            <p>{r.review}</p>
            <small>{new Date(r.createdAt).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
