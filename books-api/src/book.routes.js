const express = require("express");
const Book = require("./book.model");
const router = express.Router();

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

// Get a single book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send("Book not found");
    res.send(book);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
});

// Add a new book
router.post("/", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    price: req.body.price,
    stock: req.body.stock,
    rating: req.body.rating,
  });
  await book.save();
  res.send(book);
});

// Update an existing book
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        price: req.body.price,
        stock: req.body.stock,
        rating: req.body.rating,
      },
      { new: true }
    );

    if (!book) return res.status(404).send("Book not found");
    res.send(book);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
});

// Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) return res.status(404).send("Book not found");
    res.send(book);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
});

module.exports = router;
