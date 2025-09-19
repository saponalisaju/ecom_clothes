import React, { useContext, useEffect, useRef, useState } from "react";
import "./CSS/ShopNavbar.css";
import logo from "../Assets/mylogo2.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";
import NavbarTop from "./TopNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const ShopNavbar = () => {
  const { cartItems, getTotalCartAmount, getTotalCartItems } =
    useContext(ShopContext);
  const [menu, setMenu] = useState("shop");
  const [active, setActive] = useState(false);

  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

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
      <div className="bg-body">
        <NavbarTop />
      </div>

      <div className="navbar">
        <div className="nav-logo">
          <img className="img1" src={logo} alt="" />
          <p className="fst-italic">HANGER BD</p>
        </div>
        <img
          className="nav-dropdown"
          onClick={dropdown_toggle}
          src={nav_dropdown}
          alt=""
        />
        <ul ref={menuRef} className="nav-menu">
          <li
            onClick={() => {
              setMenu("shop");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              Shop
            </Link>
            {menu === "shop" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("mens");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/mens">
              Men
            </Link>
            {menu === "mens" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("womens");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/womens">
              Women
            </Link>
            {menu === "womens" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("kids");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/kids">
              Kids
            </Link>
            {menu === "kids" ? <hr /> : <></>}
          </li>
        </ul>
        <div className="nav-login-cart">
          <Link to="/all">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>
          <Link to="/login">
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
            <div className="nav-cart-count">{getTotalCartItems()}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ShopNavbar;
