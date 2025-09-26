import { Link } from "react-router-dom";
import "./CSS/TopNavbar.css";

const TopNavbar = () => {
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
          <select name="" value="" className="p-0 ps-1 m-0">
            <option value="ENGLISH">English</option>
            <option value="BANGLA">Bangla</option>
            <option value="BANGLA">Hindi</option>
          </select>
          <select name="" value="CUR" className="p-0 ps-1 m-0">
            <option value="">USD</option>
            <option value="TK">Tk</option>
            <option value="RUPEE">Rp</option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default TopNavbar;
