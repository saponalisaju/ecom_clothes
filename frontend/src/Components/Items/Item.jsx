import React from "react";
import PropTypes from "prop-types";
import "./Item.css";

const Item = ({ _id, name, image, new_price, old_price, rating, onClick }) => {
  return (
    <div className="item" key={_id} onClick={onClick}>
      <img src={image} alt={name} className="item-image" />
      <div className="item-details">
        <h3 className="item-name">{name}</h3>
        <div className="d-flex justify-content-between">
          <p className="item-price d-flex">
            {new_price && (
              <span className="new-price">
                <del>${new_price}</del>
              </span>
            )}
            &nbsp; &nbsp;
            {old_price && <span className="old-price">${old_price}</span>}
          </p>
          <p>{rating}</p>
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  new_price: PropTypes.number,
  old_price: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};
export default Item;
