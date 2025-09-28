const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Users = require("../models/userModel");

exports.fetch_user = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, jwtActivationKey);
    const user = await Users.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

exports.get_cart = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const cartData = await Cart.findOne({ userId, status: "active" }).lean();

    if (!cartData) {
      return res.status(404).json({ error: "Cart not found" });
    }
    if (!cartData) {
      return res.status(404).json({ cart: { items: [] } });
    }

    res.status(200).json({ cart: cartData });
  } catch (error) {
    next(error);
  }
};

exports.add_to_cart = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const { productId, quantity = 1, variant } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    if (!productId) {
      return res.status(400).json({ error: "Missing product ID" });
    }

    // Optional: fetch price snapshot
    const product = await Product.findById(productId).select("price");
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const cart = await Cart.findOne({ userId, status: "active" });

    if (!cart) {
      // Create new cart
      const newCart = await Cart.create({
        userId,
        items: [
          {
            productId,
            quantity,
            priceAtAdd: product.price,
            variant,
          },
        ],
      });
      return res.status(201).json({ message: "Cart created", cart: newCart });
    }

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        JSON.stringify(item.variant || {}) === JSON.stringify(variant || {})
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        productId,
        quantity,
        priceAtAdd: product.price,
        variant,
      });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    next(error);
  }
};

exports.update_cart = async (req, res, next) => {
  try {
    const { productId, quantity, variant = {} } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    if (!productId) {
      return res.status(401).json({ error: "Missing productId" });
    }

    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        JSON.stringify(item.variant || {}) === JSON.stringify(variant || {})
    );

    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    } else if (quantity > 0) {
      const product = await Product.findById(productId).select("price");
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      cart.items.push({
        productId,
        quantity,
        priceAtAdd: product.price,
        variant,
      });
    }
    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Cart update failed: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.remove_from_cart = async (req, res, next) => {
  try {
    const { productId, variant = {} } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    if (!productId) {
      return res.status(401).json({ error: "Missing productId" });
    }

    const cart = await Cart.findOne({ userId, status: "active" });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        JSON.stringify(item.variant || {}) === JSON.stringify(variant || {})
    );

    if (itemIndex > -1) {
      const currentQty = cart.items[itemIndex].quantity;
      if (currentQty > 1) {
        cart.items[itemIndex].quantity -= 1;
      } else {
        cart.items.splice(itemIndex, 1);
      }
      await cart.save();
    }
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Remove from cart failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
