import React, { useCallback, useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
import api from "../../api";

const ListProduct = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/product/all_products", {
        timeout: 5000,
      });
      const uniqueProducts = Array.from(
        new Map(response.data.map((p) => [p._id, p])).values()
      );
      console.log("abc", response.data);
      setAllProducts(uniqueProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInfo();
  }, [fetchInfo]);

  const remove_product = useCallback(async (id) => {
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
  }, []);

  return (
    <>
      {!loading && allProducts.length === 0 && (
        <p className="no-products">No products available.</p>
      )}

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
          {allProducts.map((product, index) => (
            <div
              key={product._id || index}
              className="listproduct-format-main listproduct-format"
            >
              <img
                src={product.image || "/default.png"}
                alt={product.name || "Product image"}
                onError={(e) => (e.target.src = "/default.png")}
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
                alt="remove product"
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
