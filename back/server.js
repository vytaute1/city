const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.delete("/api/items/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item" });
  }
});

// PUT: Edit an item by ID
app.put("/api/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body, // The new data
      { new: true } // Return the updated document
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to update item" });
  }
});
// POST: Add a new item
app.post("/api/items", async (req, res) => {
  try {
    const newItem = new Item(req.body); // Create a new item with the data from the request body
    await newItem.save(); // Save the item to the database
    res.status(201).json(newItem); // Send the new item back in the response
  } catch (err) {
    res.status(500).json({ error: "Failed to add item" });
  }
});
// DELETE: Remove an item by ID
app.delete("/api/items/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id); // Remove the item from the database
    res.json({ message: "Item removed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
});
http.createServer(app);
app.listen(8080, () => console.log("The server is running on port 8080"));
