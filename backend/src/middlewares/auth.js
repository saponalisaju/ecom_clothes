const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { jwtAccessKey, jwtActivationKey } = require("../../secret");
const User = require("../models/userModel");
const { createToken } = require("../helpers/jsonwebtoken");

exports.isLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw createError(401, "Access denied. No token provided.");
    }
    const decoded = jwt.verify(token, jwtAccessKey);
    if (!decoded) {
      throw createError(401, "Invalid access token. Please login");
    }
    req.user = decoded.user;
    next();
  } catch (error) {
    next(error);
  }
};

exports.isLoggedOut = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, jwtActivationKey);
        if (decoded) {
          throw createError(400, "User is already logged in");
        }
      } catch (error) {
        throw error;
      }
    }
    next();
  } catch (error) {
    return next(error);
  }
};

exports.attachUserFromToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, jwtActivationKey);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, jwtAccessKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

exports.isAdminAuthenticated = (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return next(createError(401, "Admin access denied. No token provided."));
  }

  try {
    const decoded = jwt.verify(token, jwtAccessKey);
    if (decoded.role !== "admin") {
      return next(createError(403, "Forbidden: Admins only"));
    }
    req.user = decoded.user;
    next();
  } catch (error) {
    next(createError(401, "Invalid admin token"));
  }
};

exports.isAuthenticated = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json("Access Denied");
  }
  try {
    const verified = createToken(token, jwtAccessKey);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json("Invalid Token");
  }
};

exports.secureFetch = (url, options = {}) => {
  const token = localStorage.getItem("auth-token");
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
