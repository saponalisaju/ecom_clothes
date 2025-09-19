import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
import api from "../../api";

const ListProduct = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/product/all_products", {
        timeout: 5000,
      });
      console.log("List", response.data);
      setAllProducts(response?.data?.products || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Error fetching products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      alert("Access denied. validation Error.");
      return;
    }
    try {
      await api.delete(`/product/remove_product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000,
      });

      setAllProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete error: ", error);
      setError("Access denied. Please ensure a valid user is logged in.");
    }
  };

  return (
    <>
      {loading && <p className="loading">Loading products...</p>}

      <div className="list-product">
        <h1 className="">All Products List</h1>
        {error && <p>{error}</p>}
        <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
          <hr />
          {allProducts.map((product) => (
            <div
              key={product._id}
              className="listproduct-format-main listproduct-format"
            >
              <img
                src={product.image}
                alt={product.name || "Product image"}
                className="listproduct-product-icon"
              />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this product."
                    )
                  ) {
                    remove_product(product._id);
                  }
                }}
                className="listproduct-remove-icon"
                src={cross_icon}
                alt=""
              />
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListProduct;
