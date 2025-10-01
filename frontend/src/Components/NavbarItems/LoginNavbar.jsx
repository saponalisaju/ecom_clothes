import React, { useContext, useEffect, useState } from "react";
import "./CSS/LoginNavbar.css";
import logo from "../Assets/mylogo2.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";

const LoginNavbar = () => {
  const { cartItems, getTotalCartAmount, getTotalCartItems } =
    useContext(ShopContext);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const total =
    Object.values(cartItems).length === 0 ? 0 : getTotalCartAmount();

  return (
    <nav expand="lg" className={`fixed-top  ${active ? "active-nav" : ""}`}>
      <div className="navbar_login">
        <div className="nav-logo">
          <img className="img1" src={logo} alt="" />
          <p className="fst-italic">HANGER BD</p>
        </div>

        <div className="nav-login-cart">
          <Link to="/" className="text-decoration-none text-black">
            HOME
          </Link>
          <Link to="/user_login">
            <FontAwesomeIcon
              className="border border-2 border-primary p-2 rounded-3 "
              icon={faUser}
            />
          </Link>
          <div>${total.toFixed(2)}</div>
          <div className="position-relative pb-4 pe-5">
            <Link to="/cart">
              <img src={cart_icon} alt="" />
            </Link>
            <div className="nav-cart-count-login">{getTotalCartItems()}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LoginNavbar;
