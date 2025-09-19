import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import "./CSS/WishListNavbar.css";

const WishListNavbar = () => {
  const [active, setActive] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);

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
      className={`fixed-top wish-nav ${active ? "active-nav" : ""}`}
    >
      <ul className="wish_ul_top">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/blog">Blog</NavLink>
        </li>
        <li>
          <NavLink to="/shop">Shop</NavLink>
        </li>
        <li>
          <NavLink to="/contact ">Contact</NavLink>
        </li>
      </ul>

      <ul className="wish_ul_bottom">
        <li>
          <NavLink to="/all">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/login">
            <FontAwesomeIcon icon={faUser} />
          </NavLink>
        </li>
        <li className="cart_icon">
          <NavLink to="/cart">
            <FontAwesomeIcon icon={faBagShopping} />
            <div className="nav-cart">{getTotalCartItems()}</div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default WishListNavbar;
