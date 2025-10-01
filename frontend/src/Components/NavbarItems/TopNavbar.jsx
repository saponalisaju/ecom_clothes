import { NavLink } from "react-router-dom";
import "./CSS/TopNavbar.css";
import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const TopNavbar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("ENGLISH");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Navbar
      expand="lg"
      expanded={isExpanded}
      className={`fixed-top navbar_top ${isExpanded ? "active-bar" : ""}`}
    >
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setIsExpanded((prev) => !prev)}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navbar_item">
          <ul className="ul_top ">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/account">My Account</NavLink>
            </li>
            <li>
              <NavLink to="/wish">Wishlist</NavLink>
            </li>
            <li>
              <NavLink to="/orderTrac">Order Tracking</NavLink>
            </li>
          </ul>

          <ul className="ul_middle">
            <li className="security">
              <span>100% Secure delivery without contacting the courier</span>
            </li>
          </ul>

          <ul className="ul_bottom d-flex">
            <li className="help_link">
              <NavLink className="text-primary" to="/help">
                Need help?
              </NavLink>
              &nbsp;
              <span>Call Us +000 000 0000</span>
            </li>
            <li className="select_item d-flex">
              <select
                name="language"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="p-0 ps-1 m-0"
              >
                <option value="ENGLISH">English</option>
                <option value="BANGLA">Bangla</option>
                <option value="HINDI">Hindi</option>
              </select>
              <select
                name="currency"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="p-0 ps-1 m-0"
              >
                <option value="USD">USD</option>
                <option value="TK">Tk</option>
                <option value="RUPEE">Rp</option>
              </select>
            </li>
          </ul>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNavbar;
