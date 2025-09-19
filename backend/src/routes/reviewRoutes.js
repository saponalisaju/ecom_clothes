const express = require("express");

const reviewRouter = express.Router();
const reviewController = require("../controllers/reviewController");

reviewRouter.post("/review", reviewController.addReview);

module.exports = reviewRouter;
