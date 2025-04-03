const express = require("express");
const Review = require("../models/Review");
const router = express.Router();

// GET reviews for a product
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).populate("user", "name");
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST a new review
router.post("/", async (req, res) => {
  try {
    const { productId, text, rating } = req.body;

    if (!text || !rating || !productId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newReview = new Review({
      productId,
      text,
      rating,
      user: req.user ? req.user._id : null, // Modify based on authentication
    });

    await newReview.save();
    res.status(201).json({ message: "Review added successfully!" });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
