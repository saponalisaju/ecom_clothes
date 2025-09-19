import React from "react";
import "./CSS/AboutUsTopNavbar.css";
import { NavLink } from "react-router-dom";

const AboutTopNavbar = () => {
  return (
    <nav className="about_top_nav">
      <ul>
        <li>
          <NavLink to="/shop">
            Free shipping on orders over $120. Shop Now
          </NavLink>
        </li>
        <li className="">
          <NavLink to="/shop">
            Free shipping on orders over $120. Shop Now
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop">
            Free shipping on orders over $120. Shop Now
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop">
            Free shipping on orders over $120. Shop Now
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AboutTopNavbar;
