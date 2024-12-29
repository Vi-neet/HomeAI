const Item = require("../models/itemModel");
const mongoose = require("mongoose");

// Get all items
const getAllItems = async (req, res) => {
  // Finding every Item and sorting them by createdAt in descending order (newest first)
  const items = await Item.find({}).sort({ createdAt: -1 });
  res.status(200).json(items);
};
// Get single item
const getSingleItem = async (req, res) => {
  // Find item by id using the params
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Item" });
  }
  const item = await Item.findById(id);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.status(200).json(item);
};
// Create new Item
const createItem = async (req, res) => {
  const { title, content } = req.body;
  // Adding title and content
  try {
    const item = await Item.create({ title, content });
    res.status(200).json(item);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  const { id } = req.params;
  //Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Item" });
  }
  const item = await Item.findOneAndDelete({ _id: id });
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.status(200).json(item);
};
// Update item
const updateItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Item" });
  }

  const item = await Item.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.status(200).json(item);
};

module.exports = {
  getAllItems,
  getSingleItem,
  createItem,
  deleteItem,
  updateItem,
};
