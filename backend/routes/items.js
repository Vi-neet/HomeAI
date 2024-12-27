const express = require("express");
const router = express.Router();
const {
  getAllItems,
  getSingleItem,
  createItem,
  deleteItem,
  updateItem,
} = require("../controllers/itemController");

//Get all items
router.get("/", getAllItems);
// GET single item
router.get("/:id", getSingleItem);

// POST an item
router.post("/", createItem); // Correct the usage

// DELETE single item
router.delete("/:id", deleteItem);
router.patch("/:id",updateItem);
module.exports = router;
