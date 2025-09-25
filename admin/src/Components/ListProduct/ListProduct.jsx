import React, { useCallback, useEffect, useState } from "react";
import "./ListProduct.css";
import api from "../../api";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";

const ListProduct = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get("/product/search_product", {
        params: { page, limit: 10, search },
        timeout: 5000,
      });

      setAllProducts(response?.data?.products || []);
      setTotalPages(response?.data?.totalPages || 0);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

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
      {loading && (
        <div className="spinner-overlay">
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: "10rem", height: "10rem" }}
          />
        </div>
      )}

      <div className="list-product">
        <h1 className="">All Products List</h1>
        <div className="product_search">
          <p className="fs-5">Show 1-10 products</p>
          <div className="search_box">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
          </div>
        </div>
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
          {allProducts && allProducts.length > 0 ? (
            allProducts.map((product) => {
              const { _id, image, name, old_price, new_price, category } =
                product;
              return (
                <div
                  key={_id}
                  className="listproduct-format-main listproduct-format"
                >
                  <img
                    src={image}
                    alt={name}
                    onError={(e) => (e.target.src = "/default.png")}
                    className="listproduct-product-icon"
                  />
                  <p>{name}</p>
                  <p>${old_price}</p>
                  <p>${new_price}</p>
                  <p>{category}</p>
                  <div className="d-flex">
                    <p
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this product."
                          )
                        ) {
                          remove_product(product._id);
                        }
                      }}
                      className="listproduct-remove-icon text-danger"
                    >
                      Delete
                    </p>
                    <Link
                      className="text-decoration-none text-warning"
                      to="/update_product"
                      state={{
                        _id,
                        image,
                        name,
                        old_price,
                        new_price,
                        category,
                      }}
                    >
                      Edit
                    </Link>
                  </div>
                  <hr />
                </div>
              );
            })
          ) : (
            <p>No Product found</p>
          )}
        </div>
        <div className="pagination_list justify-content-end mb-3 ">
          <button
            className="btn btn-secondary btn-sm p-1"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>

          <span className="page_number">
            Page {page} of {totalPages}
          </span>

          <button
            className="btn btn-secondary btn-sm p-1"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ListProduct;
