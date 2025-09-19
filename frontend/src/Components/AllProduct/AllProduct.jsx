import React, { useCallback, useContext, useEffect, useState } from "react";
import "./AllProduct.css";
import { ShopContext } from "../../Context/ShopContext";
import api from "../../api";
import { Link } from "react-router-dom";
import AboutUsNavbar from "../NavbarItems/AboutUsNavbar";

const AllProduct = () => {
  const { addToCart } = useContext(ShopContext);
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`/product/search_product`, {
        params: { page, limit: 10, search },
        timeout: 5000,
      });
      console.log("new", response);
      setAllProducts(response?.data?.products || []);
      setTotalPages(response?.data?.totalPages || 0);
    } catch (error) {
      setError("Failed to fetch new collections.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="allproduct">
      <AboutUsNavbar />
      <div className=" input_search">
        <h1>All Products</h1>
        <input
          className="ms-auto"
          type="text"
          value={search}
          placeholder="Search here..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="allproduct-format-main">
        <p>Products</p>
        <p>Product Title</p>
        <p>Price</p>
        <p>Add</p>
      </div>

      <hr />
      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-danger text-center">{error}</p>}
      {allProducts.map((product) => {
        if (!product._id) {
          return null;
        }

        return (
          <div key={product._id}>
            <div className="allproduct-format allproduct-format-main">
              {product.image ? (
                <Link
                  to="/display_product"
                  state={{ product }}
                  className="cartIcon-product-link"
                >
                  <img
                    src={product.image}
                    alt="product"
                    className="carticon-product-icon"
                  />
                </Link>
              ) : (
                <p>No image available</p>
              )}
              <p>{product.name}</p>
              <p>${product.new_price}</p>

              <button
                className="add_button"
                onClick={() => addToCart(product._id)}
              >
                add to cart
              </button>
            </div>
            <hr />
          </div>
        );
      })}
      <div className="pagination justify-content-end mb-3 ">
        <button
          className="btn btn-secondary btn-sm p-1"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span className="page-link">
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
  );
};

export default AllProduct;
