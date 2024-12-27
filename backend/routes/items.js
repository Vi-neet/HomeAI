const express = require("express");
const Item = require("../models/itemModel");
const router = express.Router();

//Get all items
router.get("/", (req, res) => {
  res.json({ message: "Get ALL items" });
});
// GET single item
router.get("/:id", (req, res) => {
  res.json({ message: "Get single item" });
});

// POST an item
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  try {
    const item = await Item.create({ title, description });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});
// DELETE single item
router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE single item" });
});
router.patch("/:id", (req, res) => {
  res.json({ message: "Update an item" });
});
module.exports = router;
