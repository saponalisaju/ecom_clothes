import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./OrderItem.css";
import cross_icon from "../Assets/icons8-cross-30.png";

const Order = ({ handleSubmit, loading }) => {
  const { cartItems, allProduct, getTotalCartAmount } = useContext(ShopContext);

  // const navigate = useNavigate();

  // const handleConfirmOrder = async () => {
  //   const orderedItems = allProduct
  //     .filter((product) => cartItems[String(product._id)] > 0)
  //     .map((product) => ({
  //       id: product._id,
  //       name: product.name,
  //       quantity: cartItems[String(product._id)],
  //       price: product.new_price,
  //       subtotal: product.new_price * cartItems[String(product._id)],
  //     }));

  //   const total = getTotalCartAmount();
  //   try {
  //     const requiredFields = [
  //       "fullName",
  //       "email",
  //       "phone",
  //       "city",
  //       "address",
  //       "paymentMethod",
  //     ];
  //     const missingFields = requiredFields.filter((field) => !formData[field]);

  //     if (missingFields.length > 0 || !formData.termsAccepted) {
  //       alert("Please fill all required fields and accept the terms.");
  //       return;
  //     }

  //     await api.post(
  //       "/order/place_order",
  //       { customerData: formData, orderedItems, total },
  //       {
  //         headers: { "Content-Type": "application/json" },
  //         timeout: 5000,
  //       }
  //     );
  //     console.log("Order confirmed:", { orderedItems, total });

  //     setOrderConfiremed(true);
  //     clearCart();
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Order isn't confiremed ");
  //   }
  // };

  return (
    <>
      <div className="order_summery">
        <p className="order_head fw-bold">Order Summery</p>
        <hr />
        <div className="product_heading p-1">
          <p className="fw-bold">Product</p>
          <p className="fw-bold">Subtotal</p>
        </div>
        <hr />
        <div className="cart_items">
          {allProduct
            .filter((product) => cartItems[String(product._id)] > 0)
            .map((product) => {
              const quantity = cartItems[String(product._id)];
              if (!quantity || !product._id) {
                return null;
              }

              return (
                <div
                  key={product._id}
                  className="product_details product_heading"
                >
                  <p className="name_des">
                    {product.name.length > 25
                      ? product.name.slice(0, 25) + "..."
                      : product.name}
                    &nbsp;
                    <img src={cross_icon} alt="cross" className="cross_icon" />
                    {quantity}
                  </p>
                  <p className="">${product.new_price * quantity}</p>
                </div>
              );
            })}
        </div>
        <hr />
        <div className="d-flex justify-content-between fw-bold fs-4 pt-3">
          <p>Total</p>
          <p>${getTotalCartAmount()}.00</p>
        </div>
        <button
          className="btn btn-danger w-100 fs-3"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "loading..." : "Confirm Order"}
        </button>
      </div>
    </>
  );
};

export default Order;
