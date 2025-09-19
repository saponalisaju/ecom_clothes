import "./Admin.css";
import { Navigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import React, { Routes, Route } from "react-router-dom";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import LoginSignup from "../Profile/LoginSignup";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/add_product" element={<AddProduct />} />
        <Route path="/list_product" element={<ListProduct />} />
        <Route path="/profile" element={<LoginSignup />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default Admin;
