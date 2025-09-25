import "./Admin.css";
import { Navigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import React, { Routes, Route } from "react-router-dom";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import UpdateProduct from "../../Components/UpdateProduct/UpdateProduct";
import AdminLoginSignup from "../Profile/AdminLoginSignup";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/add_product" element={<AddProduct />} />
        <Route path="/update_product" element={<UpdateProduct />} />
        <Route path="/list_product" element={<ListProduct />} />
        <Route path="/" element={<AdminLoginSignup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default Admin;
