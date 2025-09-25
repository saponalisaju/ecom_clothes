import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/delete_icon.png";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import Navbar from "../NavbarItems/ShopNavbar";

const CartItems = () => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(5);
  const [message, setMessage] = useState("");

  const {
    error,
    allProduct,
    cartItems,
    getTotalCartAmount,
    addToCart,
    removeFromCart,
  } = useContext(ShopContext);

  const totalQuantity = Object.values(cartItems).reduce(
    (acc, qty) => acc + qty,
    0
  );

  const handlePromoSubmit = async () => {
    if (!code.trim()) {
      setMessage("Please enter a promo code.");
      return;
    }
    try {
      const res = await api.post("/coupon/create", {
        code: code,
        discount: discount,
      });
      console.log("pro ", res.data);
      if (res.data.valid) {
        setDiscount(res.data.discount); // e.g., 10 for 10%
        setMessage(`Promo applied: ${res.data.discount}% off`);
      } else {
        setMessage("Invalid promo code.");
      }
    } catch (err) {
      setMessage("Error validating promo code.");
      console.error(err);
    }
  };

  const total = getTotalCartAmount();
  const totalDiscountableAccount = discount
    ? total - (total * discount) / 100
    : total;

  const navigate = useNavigate();
  const handleCheckOut = () => {
    navigate("/checkout");
  };

  return (
    <div className="cartitems">
      <Navbar />
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Subtotal</p>
        <p>Remove</p>
      </div>
      <hr />

      {error && <p className="text-danger text-center">{error}</p>}
      {totalQuantity === 0 && (
        <p className="text-center fs-3 p-3 text-warning">Your cart is empty.</p>
      )}

      {allProduct
        .filter((product) => cartItems[String(product._id)] > 0)
        .map((product) => {
          const quantity = cartItems[String(product._id)];
          if (!quantity || !product._id) {
            return null;
          }

          return (
            <div key={product._id}>
              <div className="cartitems-format cartitems-format-main">
                {product.image ? (
                  <Link
                    to="/display_product"
                    state={{ product }}
                    className="cartIcon-product-link"
                  >
                    <img
                      src={product.image}
                      alt="product"
                      className="carticon-product-icon"
                    />
                  </Link>
                ) : (
                  <p>No image available</p>
                )}

                <p>{product.name}</p>
                <p>{product.new_price} tk.</p>
                <p>
                  <button
                    className="updated_quantity"
                    onClick={() => removeFromCart(product._id)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="p-2"> {quantity}</span>
                  <button
                    className="updated_quantity"
                    onClick={() => addToCart(product._id)}
                  >
                    +
                  </button>
                </p>
                <p>{product.new_price * quantity} tk.</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(product._id);
                  }}
                  alt="Remove"
                />
              </div>
              <hr />
            </div>
          );
        })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} tk.</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee {discount}% Off</p>
              <p>{(getTotalCartAmount() * discount) / 100} tk.</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{totalDiscountableAccount} tk.</h3>
            </div>
          </div>
          <button
            className="rounded-5"
            disabled={totalQuantity === 0}
            onClick={handleCheckOut}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input
              type="text"
              name="code"
              placeholder="Enter promo code"
              value={code}
              onChange={(e) => setCode(e.target.value.trim().toUpperCase())}
            />
            <button onClick={handlePromoSubmit}>Submit</button>
          </div>
          {message && <p className="promo-feedback text-danger">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
