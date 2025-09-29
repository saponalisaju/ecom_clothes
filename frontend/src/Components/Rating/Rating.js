// components/Rating.js
import React from "react";
import "./Rating.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as faStarEmpty,
} from "@fortawesome/free-solid-svg-icons";

const Rating = ({ value, color = "red" }) => {
  const safeValue = Math.max(0, Math.min(5, value));
  const fullStars = Math.floor(safeValue);
  const halfStar = safeValue % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="rating text-danger">
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesomeIcon
          key={`full-${i}`}
          icon={faStar}
          title={`${i + 1} Star`}
          style={{ color }}
        /> // ★
      ))}
      {halfStar && (
        <FontAwesomeIcon
          key="half"
          icon={faStarHalfAlt}
          title={`${fullStars + 0.5} Stars`}
          style={{ color: "red" }}
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesomeIcon
          key={`empty-${i}`}
          icon={faStarEmpty}
          style={{ opacity: 0.3 }}
        />
      ))}
      <p className="rating-label">{safeValue.toFixed(1)} out of 5</p>
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default Rating;
