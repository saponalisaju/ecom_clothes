import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { useLocation, useNavigate } from "react-router-dom";
// import api from "../../api";

import { useContext } from "react";
import ShopNavbar from "../NavbarItems/ShopNavbar";

const ProductDisplay = () => {
  const { updateCartItem } = useContext(ShopContext);
  const { state } = useLocation();
  const product = state?.product;
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!product) {
    return <p>No Product found.</p>;
  }

  const handleAddSize = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await updateCartItem(product._id, 1, {
        size: selectedSize,
        color: selectedColor,
      });
      if (result) {
        navigate("/cart");
      } else {
        setError("Error adding size to cart items.");
      }
    } catch (err) {
      setError("Unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ShopNavbar />
      {loading && <div className="text-center">Loading...</div>}
      <div className="productdisplay">
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
          </div>

          <div className="productdisplay-img">
            <img
              className="productdisplay-main-img"
              src={product.image}
              alt=""
            />
          </div>
        </div>
        <div className="productdisplay-right">
          <h1>{product.name}</h1>
          <div className="productdisplay-right-stars">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
          </div>
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">
              {product.old_price}tk.
            </div>
            <div className="productdisplay-right-price-new">
              {product.new_price}tk.
            </div>
          </div>
          <div className="productdisplay-right-description">
            A shirt is an upper-body garment with a collar, sleeves, and a front
            opening, available in various styles and fabrics for both casual and
            formal wear.
          </div>
          <div className="productdisplay-right-size">
            <h1>Select Size </h1>
            <div className="productdisplay-right-sizes">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  className={`size-option ${
                    selectedSize === size ? "active" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
            <h1>Select Color </h1>
            <div className="productdisplay-right-colors">
              {[
                "Green",
                "Yellow",
                "Violent",
                "Red",
                "Black",
                "Orange",
                "Pink",
              ].map((color) => (
                <div
                  key={color}
                  className={`color-option ${
                    selectedColor === color ? "active" : ""
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </div>
              ))}
            </div>
            {error && <p className="fs-4">{error}</p>}
          </div>
          <button
            className="rounded-5"
            disabled={loading}
            onClick={() => {
              if (!selectedSize) {
                setError("Please select a size before adding to cart.");
                return;
              }
              handleAddSize();
            }}
          >
            {loading ? "Adding..." : "ADD TO CART"}
          </button>
          <p className="productdisplay-right-category">
            <span>Category :</span>Women , T-Shirt, CropTop
          </p>
          <p className="productdisplay-right-category">
            <span>Tags :</span>Modern , Latest
          </p>
        </div>
      </div>
    </>
  );
};

ProductDisplay.propTypes = {
  product: PropTypes.object,
};

// ProductDisplay.propTypes = {
//   product: PropTypes.shape({
//     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//     name: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     old_price: PropTypes.number,
//     new_price: PropTypes.number,
//   }).isRequired,
// };

export default ProductDisplay;
