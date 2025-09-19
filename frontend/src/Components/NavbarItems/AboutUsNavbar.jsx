import React, { useContext, useEffect, useState } from "react";
import "./CSS/AboutUsNavbar.css";
import { NavLink } from "react-router-dom";
import AboutTopNavbar from "./AboutUsTopNavbar";
import { ShopContext } from "../../Context/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const AboutUsNavbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scroll > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      expand="lg"
      className={`about-navbar fixed-top ${active ? "active-about" : ""}`}
    >
      <AboutTopNavbar />
      <div className="main_nav">
        <ul className="about_us_ultop">
          <li>
            <NavLink to="/mens"> Men</NavLink>
          </li>
          <li>
            <NavLink to="/womens">Women</NavLink>
          </li>
          <li>
            <NavLink to="/kids"> Kids</NavLink>
          </li>
          <li>
            <NavLink to="/accessories"> Accessories</NavLink>
          </li>
        </ul>

        <ul className="about_us_ulmiddle">
          <li>
            <NavLink to="/exc">Exce</NavLink>
          </li>
        </ul>
        <ul className="about_us_ulbottom">
          <li>
            <NavLink to="/all">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart">Bag({getTotalCartItems()})</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AboutUsNavbar;
