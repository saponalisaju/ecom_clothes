import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Item from "../Items/Item";
import Spinner from "react-bootstrap/esm/Spinner";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import Rating from "../Rating/Rating";

const Kid = () => {
  const { addToCart } = useContext(ShopContext);
  const [popularKid, setPopularKid] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get(`product/popular_kid`, {
        timeout: 5000,
      });
      console.log("Kid", response);
      setPopularKid(Array.isArray(response?.data) ? response.data : []);
    } catch (error) {
      setError("Failed to fetch kid collection");
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
    <div className="new__collections">
      <h1>POPULAR IN KID</h1>
      <hr />
      {loading ? (
        <div className="text-center mt-3">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="collections">
          {popularKid.map((item) => {
            return (
              <div className="p-2" key={item._id}>
                <Item
                  _id={item._id}
                  name={item.name}
                  image={item.image || "default.png"}
                  new_price={item.new_price}
                  old_price={item.old_price}
                  onClick={() => handleProductDisplay(item)}
                  rating={item.rating}
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

export default Kid;
