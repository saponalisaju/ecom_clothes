import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Men.css";
import Item from "../Items/Item";
import Spinner from "react-bootstrap/esm/Spinner";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import Rating from "../Rating/Rating";

const Men = () => {
  const { addToCart } = useContext(ShopContext);
  const [popularMen, setPopularMen] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`product/popular_men`, {
        timeout: 5000,
      });
      console.log("Men", response);
      setPopularMen(Array.isArray(response?.data) ? response.data : []);
    } catch (error) {
      setError("Failed to fetch men collection");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProductDisplay = (item) => {
    navigate("/display_product", { state: { product: item } });
  };

  return (
    <div className="men">
      <h1>POPULAR IN MEN</h1>
      <hr />
      {loading ? (
        <div className="text-center mt-3">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="popular-item">
          {popularMen.map((item, i) => {
            return (
              <div className="p-3" key={item._id}>
                <Item
                  _id={item._id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                  onClick={() => handleProductDisplay(item)}
                />
                <Rating value={item.rating || 0} />
                <button
                  className="rounded-3 p-2 w-100 border border-info fs-5 text-info bg-white"
                  onClick={() => addToCart({ productId: item._id })}
                >
                  add to cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Men;
