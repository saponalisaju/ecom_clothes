import React, { useContext } from "react";
import PropTypes from "prop-types";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Items/Item";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../Components/NavbarItems/BottomNavbar";

const ShopCategory = (props) => {
  const { allProduct, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleProductDisplay = (item) => {
    navigate("/display_product", { state: { product: item } });
  };
  return (
    <div className="shop-category">
      <BottomNavbar />
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 product
        </p>
        <select className="shopcategory-sort">
          <option value="" disabled>
            Sort by
          </option>
          <option value="">all</option>
        </select>
        Sort by <img src={dropdown_icon} alt="" />
      </div>
      <div className="shopcategory-products">
        {allProduct.map((item) => {
          const { _id, name, image, new_price, old_price } = item;

          if (props.category === item.category) {
            return (
              <div className="p-3" key={item._id}>
                <Item
                  _id={_id}
                  name={name}
                  image={image}
                  new_price={new_price}
                  old_price={old_price}
                  onClick={() => handleProductDisplay(item)}
                />
                <button
                  className="rounded-3 p-2 w-100 border border-info fs-5 text-info bg-white"
                  onClick={() => addToCart(_id)}
                >
                  add to cart
                </button>
              </div>
            );
          } else return null;
        })}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

ShopCategory.propTypes = {
  banner: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default ShopCategory;
