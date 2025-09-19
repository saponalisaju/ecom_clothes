import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./CSS/CheckoutNavbar.css";
import { ShopContext } from "../../Context/ShopContext";
import Three_dot from "../Assets/three_dot.png";
import cart_icon from "../Assets/cart_icon.png";
import my_logo from "../Assets/mylogo1.png";

const CheckoutNav = () => {
  const { getTotalCartItems } = useContext(ShopContext);
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
      className={`fixed-top checkout_nav ${active ? "active_nav" : ""}`}
    >
      <div>
        <NavLink>
          <img className="_img" src={my_logo} alt="brand_logo" />
        </NavLink>
      </div>
      <ul className="checkout_ul">
        <li>
          <NavLink to="">Home</NavLink>
        </li>
        <li>
          <NavLink to="">New Arrivals</NavLink>
        </li>
        <li>
          <NavLink to="">Sale</NavLink>
        </li>
        <li>
          <NavLink to="">Contact</NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/cart">
            <img src={cart_icon} alt="" />
          </NavLink>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </li>
        <li>
          <NavLink to="">
            <img className="_timg" src={Three_dot} alt="" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default CheckoutNav;
