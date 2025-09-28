import { Link } from "react-router-dom";
import "./CSS/TopNavbar.css";
import { useState } from "react";

const TopNavbar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("ENGLISH");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  return (
    <nav className="navbar_top">
      <ul className="ul_top">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/account">My Account</Link>
        </li>
        <li>
          <Link to="/wish">Wishlist</Link>
        </li>
        <li>
          <Link to="/orderTrac">Order Tracking</Link>
        </li>
      </ul>
      <ul className="ul_middle">
        <li className="security">
          100% Secure delivery without contacting the courier
        </li>
      </ul>
      <ul className="ul_bottom d-flex">
        <li className="help_link">
          <Link className="text-primary" to="/help">
            Need help?
          </Link>
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
    </nav>
  );
};

export default TopNavbar;
