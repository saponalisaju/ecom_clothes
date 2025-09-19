import React, { useContext, useEffect, useState } from "react";
import "./CSS/AccountNavbar.css";

import cart_icon from "../Assets/cart_icon.png";
import love_icon from "../Assets/love_icon.png";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import my_account_icon from "../Assets/my_account_icon.png";
import "bootstrap/dist/css/bootstrap.min.css";

const AccountNavbar = () => {
  const { getTotalCartAmount, getTotalCartItems } = useContext(ShopContext);
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
  return (
    <nav
      expand="lg"
      className={`fixed-top account-navbar ${
        active ? "active_account_nav" : ""
      }`}
    >
      <ul className="account_ul_top">
        <li className="brand_logo">
          <img className="" src={my_account_icon} alt="logo" />
          <p>Business</p>
        </li>
        <li>
          <NavLink>CATEGORY 1</NavLink>
        </li>
        <li>
          <NavLink>CATEGORY 2</NavLink>
        </li>
        <li>
          <NavLink>CATEGORY 3</NavLink>
        </li>
      </ul>
      <div className="search-account pt-1">
        <input type="text" className="search" placeholder="Search..." />
        <img src="" alt="logo" />
      </div>
      <ul className="accout_ul_bottom">
        <li className="account_link">
          <NavLink
            className="d-flex flex-column gap-1 align-items-center"
            to="/account"
          >
            <img className="account_image " src={my_account_icon} alt="" />
            <span>MY ACCOUNT</span>
          </NavLink>
        </li>
        <li className="account_link">
          <NavLink
            className="d-flex flex-column gap-1 align-items-center"
            to="/wish"
          >
            <img src={love_icon} alt="Logo" />
            <span>WISHLIST</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="d-flex flex-column gap-1" to="/cart">
            <img src={cart_icon} alt="" />
            <span className="nav-count ">{getTotalCartItems()}</span>
            <span className=""> ${getTotalCartAmount()}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AccountNavbar;
