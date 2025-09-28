require("dotenv").config();
const jwt = require("jsonwebtoken");
const { jwtActivationKey } = require("../../secret");
const { createToken } = require("../helpers/jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../models/userModel");

exports.sign_up = async (req, res, next) => {
  try {
    const check = await Users.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ error: "User already exists" });
    }

    // let cart = {};
    // for (let i = 0; i < 300; i++) {
    //   cart[i] = 0;
    // }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      // cartData: cart,
    });

    await user.save();

    const token = createToken({ id: user._id }, jwtActivationKey, "7d");
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error signing up:", error.message);
    res.status(500).json({
      message: "An error occurred during sign-up.",
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const compare = await bcrypt.compare(req.body.password, user.password);
    if (!compare) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = createToken({ id: user._id }, jwtActivationKey, "7d");
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};

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
