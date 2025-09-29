import React, { useContext } from "react";
import "./RelatedProducts.css";
import Item from "../Items/Item";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import Rating from "../Rating/Rating";

const RelatedProducts = () => {
  const { addToCart, allProduct } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleProductDisplay = (item) => {
    navigate("/display_product", { state: { product: item } });
  };

  return (
    <div className="related-product">
      <h1>Related Products</h1>
      <hr />

      <div className="popular-item">
        {allProduct
          .filter((item) => item.category.toLowerCase() === "men")
          .map((item) => (
            <div className="p-2" key={item._id}>
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
                className="rounded-3 p-2 w-100 border border-info fs-5 text-info bg-white"
                onClick={() => addToCart(item._id)}
              >
                add to cart
              </button>
            </div>
          ))}
      </div>

      <div className="popular-item">
        {allProduct
          .filter((item) => item.category.toLowerCase() === "women")
          .map((item) => (
            <div className="p-2" key={item._id}>
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
                className="rounded-3 p-2 w-100 border border-info fs-5 text-info bg-white"
                onClick={() => addToCart(item._id)}
              >
                add to cart
              </button>
            </div>
          ))}
      </div>

      <div className="popular-item">
        {allProduct
          .filter((item) => item.category.toLowerCase() === "kid")
          .map((item) => (
            <div className="p-2 " key={item._id}>
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
                className="rounded-3 p-2 w-100 border border-info fs-5 text-info bg-white"
                onClick={() => addToCart(item._id)}
              >
                add to cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
