import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { NavLink } from "react-router-dom";
import "./OrderItem.css";

const Order = () => {
  const {
    getTotalCartAmount,
    addToCart,
    removeFromCart,
    cartItems,
    allProduct,
  } = useContext(ShopContext);

  const discount = 5;
  return (
    <div>
      <div className="order_summery">
        <p>Order Summery</p>
        <div className="cart_items">
          {allProduct
            .filter((product) => cartItems[String(product._id)] > 0)
            .map((product) => {
              const quantity = cartItems[String(product._id)];
              if (!quantity || !product._id) {
                return null;
              }

              return (
                <div className="checkout_content" key={product._id}>
                  <div className="order-format order-item-main">
                    <div className="image_des">
                      <div className="d-flex">
                        {product.image ? (
                          <NavLink
                            to="/display_product"
                            state={{ product }}
                            className="cartIcon-product-link"
                          >
                            <img
                              src={product.image}
                              alt="product"
                              className="carticon-icon"
                            />
                          </NavLink>
                        ) : (
                          <p>No image available</p>
                        )}

                        <div className="d-flex flex-column">
                          <span className="name_des">{product.name}</span>
                          <p className="name_des">
                            ${product.new_price * quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="change_item">
                      <button
                        className="change_quantity"
                        onClick={() => removeFromCart(product._id)}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="p-2"> {quantity}</span>
                      <button
                        className="change_quantity"
                        onClick={() => addToCart(product._id)}
                      >
                        +
                      </button>
                    </p>
                  </div>
                  <hr />
                </div>
              );
            })}
        </div>
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()} </p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee {discount}% Off</p>
                <p>${(getTotalCartAmount() * discount) / 100}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>
                  {getTotalCartAmount() -
                    (getTotalCartAmount() * discount) / 100}{" "}
                  tk.
                </h3>
              </div>
            </div>
            <button className="rounded-5">Confirm Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
