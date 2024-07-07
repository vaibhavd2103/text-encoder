const express = require("express");
const Book = require("./book.model");
const base64 = require("base64-js");

const router = express.Router();

// API's to make

// get all books paginated
// get book by id
// add book
// get book by filters

// Function to decode base64 data
function decodeBase64(data) {
  return Buffer.from(data, "base64").toString("utf-8");
}

// Get all books
router.get("/", async (req, res) => {
  try {
    const encodedData = await Book.find().limit(20);
    if (encodedData.length > 0) {
      const decodedData = encodedData.map((book) => ({
        title: decodeBase64(book.title),
        price: decodeBase64(book.price),
        rating: decodeBase64(book.rating),
        stock: decodeBase64(book.stock),
        image_url: decodeBase64(book.image_url),
      }));
      res.send(decodedData);
    } else {
      res.send({
        message: "No data",
      });
    }
  } catch (error) {
    console.log(error);
  }
});
router.post("/addbook", async (req, res) => {
  const newBook = new Book({
    title: "String",
    price: "String",
    stock: "String",
    rating: "String",
    description: "String",
    tax: "String",
    product_type: "String",
    price_incl_tax: "String",
    availability: "String",
    num_reviews: "String",
    image_url: "String",
  });

  try {
    newBook.save().then((resp) => {
      res.send({
        message: "altufaltu",
      });
    });
  } catch (err) {
    res.send({
      error: JSON.stringify(err),
    });
  }
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
