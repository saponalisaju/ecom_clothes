import React, { useContext, useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Items/Item";
import Spinner from "react-bootstrap/esm/Spinner";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { ShopContext } from "../../Context/ShopContext";
import Rating from "../Rating/Rating";
import BottomNavbar from "../NavbarItems/BottomNavbar";

const NewCollections = () => {
  const { addToCart } = useContext(ShopContext);
  const [newCollections, setNewCollections] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(`/product/new_collection`, {
          timeout: 5000,
        });
        console.log("new", response);
        setNewCollections(Array.isArray(response?.data) ? response.data : []);
      } catch (error) {
        setError("Failed to fetch new collections.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProductDisplay = (item) => {
    navigate("/display_product", { state: { product: item } });
  };

  return (
    <div>
      <BottomNavbar />
      <div className="new__collections">
        <h1>LATEST COLLECTIONS</h1>
        <hr />
        {loading ? (
          <div className="text-center mt-3">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="collections">
            {newCollections.map((item) => (
              <div key={item._id}>
                <Item
                  _id={item._id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                  onClick={() => handleProductDisplay(item)}
                />
                <Rating value={item.Rating || 0} />
                <button
                  className="rounded-5 p-2 w-100 border border-info fs-5 text-info bg-white"
                  onClick={() => addToCart({ productId: item._id })}
                >
                  add to cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCollections;
