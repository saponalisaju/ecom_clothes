const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

require("./src/config/database");
const adminRouter = require("./src/routes/adminRoutes");
const userRouter = require("./src/routes/userRoutes");
const profileRouter = require("./src/routes/profileRoute");
const productRouter = require("./src/routes/productRoutes");
const orderRouter = require("./src/routes/orderRoutes");
const cartRouter = require("./src/routes/cartRoutes");
const couponRouter = require("./src/routes/couponRoutes");
const reviewRouter = require("./src/routes/reviewRoutes");

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:4000",
  "https://ecomclothes.netlify.app",
  "https://ecomclothesadmin.netlify.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: ["Authorization", "Content-Type"],
  credentials: true,
  optionsSuccessStatus: 204,
  maxAge: 86400,
};

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Origin", "http://localhost:3001");
//   res.header("Access-Control-Allow-Origin", "http://localhost:3006");
//   res.header("Access-Control-Allow-Methods", "true");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use(cors(corsOptions));
app.options("*", cors());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 600 });
app.use(cookieParser());
app.use(limiter);
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/images", express.static("upload/images"));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' http://localhost:4000"
  );
  next();
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/rating", reviewRouter);

module.exports = app;
