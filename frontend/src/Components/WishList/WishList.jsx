import React, { useContext } from "react";
import "./WishList.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/delete_icon.png";
import { Link } from "react-router-dom";

import love_icon from "../Assets/love_icon.png";
import WishListNavbar from "../NavbarItems/WishListNavbar";

const WishList = () => {
  const { allProduct, cartItems, addToCart, removeFromCart } =
    useContext(ShopContext);

  return (
    <div className="">
      <WishListNavbar />
      <div className="wishlist">
        <div className="my_wishlist">
          <img src={love_icon} alt="" />

          <h1>My Wishlist</h1>
        </div>
        <div className="wishlist-format-main">
          <p></p>
          <p>PRODUCT NAME</p>
          <p>UNIT PRICE</p>
          <p>QUANTITY</p>
          <p>STOCK STATUS</p>
          <p></p>
          <p></p>
        </div>
        <hr />

        {allProduct
          .filter((product) => cartItems[String(product._id)] > 0)
          .map((product) => {
            const quantity = cartItems[String(product._id)];
            if (!quantity || !product._id) {
              return null;
            }

            return (
              <div key={product._id}>
                <div className="wishlist-format wishlist-format-main">
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
                  <p>{quantity}</p>
                  <p>In Stock</p>
                  <p
                    className="add_button"
                    onClick={() => addToCart(product._id)}
                  >
                    Add to Bag
                  </p>
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
        <div className="view_cart w-100 d-flex ">
          <Link
            className="text-decoration-none ms-auto text-white bg-dark p-2"
            to="/cart"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishList;
