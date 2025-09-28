import React, { useContext, useEffect, useState } from "react";
import "./Women.css";
import Item from "../Items/Item";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Women = () => {
  const { addToCart } = useContext(ShopContext);
  const [popularProducts, setPopularProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(`/product/popular_women`, {
          timeout: 5000,
        });

        console.log(response);

        setPopularProducts(response?.data);
      } catch (error) {
        setError("Failed to fetch women data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // const addToCart = async (itemId) => {
  //   console.log("Adding item to cart:", itemId);

  //   const token = localStorage.getItem("auth-token");
  //   if (!token) {
  //     return;
  //   }
  //   try {
  //     const response = await api.post(
  //       `/users/add_to_cart`,
  //       { itemId },
  //       {
  //         headers: {
  //           "Content-Type": "applicaction/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleProductDisplay = (item) => {
    navigate("/display_product", { state: { product: item } });
  };

  return (
    <div className="new__collections">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="collections">
          {popularProducts.map((item) => {
            return (
              <div className="p-2" key={item._id}>
                <Item
                  _id={item._id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                  onClick={() => handleProductDisplay(item)}
                />
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

export default Women;
