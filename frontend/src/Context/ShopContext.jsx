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

  const normalizeCart = (cart) => {
    if (Array.isArray(cart?.items)) {
      const map = {};
      cart.items.forEach(({ productId, quantity }) => {
        map[productId] = quantity;
      });
      return map;
    }
    return cart || {};
  };

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
      } finally {
        setLoading(false);
      }
    };

    const fetchCart = async () => {
      setError(null);
      setLoading(true);
      const token = localStorage.getItem("auth-token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/cart/get_cart", {
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const normalized = normalizeCart(response.data.cart);
        setCartItems(normalized);

        if (Object.keys(normalized).length === 0) {
          console.log("Cart is empty");
        }
      } catch (error) {
        if (error.response?.status === 404) {
          console.warn("Cart not found, treating as empty");
          setCartItems({});
        } else {
          console.error("Error fetching cart items:", error);
          setError("Error fetching cart items");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchCart();
  }, []);

  const addToCart = useCallback(
    async ({ productId, quantity = 1, variant = {} }) => {
      console.log("Adding to cart:", {
        productId,
        quantity,
        variant,
      });

      setError(null);
      setLoading(true);

      const token = localStorage.getItem("auth-token");
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await api.post(
          "/cart/add_to_cart",
          { productId, quantity, variant },

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            timeout: 5000,
          }
        );

        if (response.data?.cart) {
          setCartItems(normalizeCart(response.data.cart));
        }
      } catch (error) {
        console.error("Error fetching cart items", error);
        setError("Error fetching cart items");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const removeFromCart = useCallback(async (productId) => {
    setError(null);
    setLoading(true);
    const token = localStorage.getItem("auth-token");
    if (!token) {
      return;
    }

    try {
      const response = await api.delete(
        "/cart/remove_from_cart",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          timeout: 5000,
          data: { productId },
        }
      );
      if (response.data?.cart) {
        setCartItems(normalizeCart(response.data.cart));
      }
      console.log("Removing cart successfully");
    } catch (error) {
      console.error("Error removing item from cart", error);
      setError("Error removing item from cart");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCartItem = useCallback(
    async (productId, quantity, variant = {}) => {
      setError(null);
      setLoading(true);
      const token = localStorage.getItem("auth-token");
      if (!token) return;

      try {
        const response = await api.put(
          "/cart/update_cart",
          {
            productId,
            quantity,
            variant,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            timeout: 5000,
          }
        );

        if (response.data?.cart) {
          setCartItems(normalizeCart(response.data.cart));
          console.log("Updated cart item successfully");
          return true;
        } else {
          setError("Cart update failed.");
        }
      } catch (error) {
        console.error("Error updating cart item", error);
        setError("Error updating cart item");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearCart = useCallback(() => {
    setCartItems({});
  }, []);

  const productMap = useMemo(() => {
    const map = {};
    allProduct.forEach((p) => {
      map[p._id] = p;
    });
    return map;
  }, [allProduct]);

  const getTotalCartAmount = useCallback(() => {
    return Object.entries(cartItems).reduce((total, [productId, quantity]) => {
      const product = productMap[productId];
      return product ? total + product.new_price * quantity : total;
    }, 0);
  }, [cartItems, productMap]);

  const getTotalCartItems = useCallback(() => {
    if (!cartItems || typeof cartItems !== "object") return 0;
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  }, [cartItems]);

  console.log("gtcartAmount", getTotalCartAmount());
  console.log("gtcartItems", getTotalCartItems());
  console.log("cartItems", cartItems);

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
      updateCartItem,
      clearCart,
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
      updateCartItem,
      clearCart,
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
