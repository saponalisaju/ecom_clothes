const { jwtActivationKey, jwtAccessKey } = require("../../secret");
const { createToken } = require("../helpers/jsonwebtoken");
const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");

const rateLimit = require("express-rate-limit");

exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Please try again later.",
});

exports.adminRegister = async (req, res, next) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "All fields are required" });
  }
  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, msg: "User already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = new Admin({
      name,
      phone,
      email,
      password: hash,
    });
    const savedUser = await user.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: savedUser._id,
        email: savedUser.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = createToken({ id: user._id }, jwtAccessKey, "30m");
    const refreshToken = createToken({ id: user._id }, jwtActivationKey, "7d");

    res.cookie("accessToken", token, {
      maxAge: 30 * 60 * 1000, // 30 minute
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days test
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: `Bearer ${token}`,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("auth-token", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
      expires: new Date(0),
    });
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
