import React, { useContext, useEffect, useState } from "react";
import "./NewCollections.css";
import Item from "../Items/Item";
import api from "../../api";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const NewCollectionsMen = () => {
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
        const response = await api.get(`/product/new_collection_men`, {
          timeout: 5000,
        });
        console.log("new", response);
        setNewCollections(response?.data);
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
    <div className="new__collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      {loading ? (
        <div>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="collections">
          {newCollections.map((item, i) => (
            <div className="p-3" key={item._id}>
              <Item
                _id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
                onClick={() => handleProductDisplay(item)}
              />
              <button
                className="rounded-3 p-2 w-100 border border-info fs-5 text-info bg-white"
                onClick={() => addToCart(item._id)}
              >
                add to cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewCollectionsMen;
