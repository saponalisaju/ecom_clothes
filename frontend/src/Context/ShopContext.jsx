import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "../api";
import PropTypes from "prop-types";
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [allProduct, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await api.get("/product/all_products", {
          timeout: 5000,
        });
        const uniqueProducts = Array.from(
          new Map(response.data.map((p) => [p._id, p])).values()
        );
        console.log("abc", response.data);
        setAllProduct(uniqueProducts);
      } catch (error) {
        setError("Error fetching all products");
      }
    };

    const fetchCart = async () => {
      setError(null);
      setLoading(true);
      const token = localStorage.getItem("auth-token");
      if (!token) {
        return;
      }
      try {
        const response = await api.post(
          "/users/get_cart",
          {},
          {
            timeout: 5000,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.cartItems === 0) {
          console.log("Cart items is Empty");
        } else {
          setCartItems(response.data || {});
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Error fetching cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    fetchCart();
  }, []);

  const addToCart = useCallback(async (itemId) => {
    setError(null);
    setLoading(true);
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
    const token = localStorage.getItem("auth-token");
    if (!token) {
      return;
    }
    try {
      const response = await api.post(
        "/users/add_to_cart",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` }, timeout: 5000 }
      );

      if (response.data?.cart) {
        setCartItems(response.data.cart);
      }
    } catch (error) {
      console.error("Error fetching cart items", error);
      setError("Error fetching cart items");
    }
  }, []);

  const removeFromCart = useCallback(async (itemId) => {
    setError(null);
    setLoading(true);
    const token = localStorage.getItem("auth-token");
    if (!token) {
      return;
    }

    try {
      const response = await api.post(
        "/users/remove_from_cart",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` }, timeout: 5000 }
      );
      if (response.data?.cart) {
        setCartItems(response.data.cart);
      }
      console.log("Removing cart successfully");
    } catch (error) {
      console.error("Error removing item from cart", error);
      setError("Error removing item from cart");
    }
  }, []);

  const productMap = useMemo(() => {
    const map = {};
    allProduct.forEach((p) => {
      map[p._id] = p;
    });
    return map;
  }, [allProduct]);

  const getTotalCartAmount = useCallback(() => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const product = productMap[id];
      return product ? total + product.new_price * qty : total;
    }, 0);
  }, [cartItems, productMap]);

  console.log("gta", getTotalCartAmount());

  const getTotalCartItems = useCallback(() => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  }, [cartItems]);

  const contextValue = useMemo(
    () => ({
      error,
      loading,
      setError,
      setLoading,
      allProduct,
      cartItems,
      addToCart,
      removeFromCart,
      getTotalCartItems,
      getTotalCartAmount,
    }),
    [
      error,
      loading,
      setError,
      setLoading,
      allProduct,
      cartItems,
      addToCart,
      removeFromCart,
      getTotalCartItems,
      getTotalCartAmount,
    ]
  );

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
