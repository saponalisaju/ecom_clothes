import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import footer_logo from "../Assets/mylogo2.png";
import instagram_icon from "../Assets/instagram_icon.png";
import pinterest_icon from "../Assets/pintester_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>HANGER BD</p>
      </div>
      <ul className="footer-links">
        <li>
          <Link to="/company">Company</Link>
        </li>
        <li>
          <Link to="/shop">Products</Link>
        </li>
        <li>
          <Link to="/office">Offices</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={pinterest_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>
          &copy; Copyright {new Date().getFullYear()} - MD. SAPON ALI - All
          Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
