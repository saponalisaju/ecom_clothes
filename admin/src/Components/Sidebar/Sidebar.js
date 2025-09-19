import "./Sidebar.css";

import add_product_icon from "../../assets/Product_Cart.svg";
import { Link, useLocation } from "react-router-dom";
import list_product_icon from "../../assets/Product_list_icon.svg";
import profile_icon from "../../assets/profile_logo.jpeg";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <Link to={"/add_product"} style={{ textDecoration: "none" }}>
        <div
          className={`sidebar-item ${
            isActive("/add_product") || location.pathname === "/add_product"
              ? "active"
              : ""
          } `}
        >
          <img src={add_product_icon} alt="" />
          <p>Add Product</p>
        </div>
      </Link>

      <Link to={"/list_product"} style={{ textDecoration: "none" }}>
        <div
          className={`sidebar-item ${
            isActive("/list_product") ? "active" : ""
          } `}
        >
          <img src={list_product_icon} alt="" />
          <p>Product List</p>
        </div>
      </Link>

      {/* <Link to={"/update_product"} style={{ textDecoration: "none" }}>
        <div
          className={`sidebar-item ${
            isActive("/update_product") ||
            location.pathname === "/update_product"
              ? "active"
              : ""
          } `}
        >
          <img src={add_product_icon} alt="" />
          <p>Update Product</p>
        </div>
      </Link> */}
      <Link to={"/profile"} style={{ textDecoration: "none" }}>
        <div
          className={`sidebar-item ${isActive("/profile") ? "active" : ""} `}
        >
          <img src={profile_icon} alt="" />
          <p>Super Admin</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
