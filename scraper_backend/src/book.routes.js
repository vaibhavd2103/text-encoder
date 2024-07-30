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
  const { page = 1, limit = 10 } = req.query;
  try {
    // Convert `page` and `limit` to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Calculate the number of documents to skip
    const skip = (pageNumber - 1) * limitNumber;
    const encodedData = await Book.find().skip(skip).limit(limitNumber);
    // Get the total count of documents
    const totalDocuments = await Book.countDocuments();
    if (encodedData.length > 0) {
      const decodedData = encodedData.map((book) => ({
        _id: book._id,
        title: decodeBase64(book.title),
        price: decodeBase64(book.price),
        rating: decodeBase64(book.rating),
        stock: decodeBase64(book.stock),
        image_url: decodeBase64(book.image_url),
      }));
      res.json({
        total: totalDocuments,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(totalDocuments / limitNumber),
        decodedData,
      });
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
    title: req.body.title,
    price: req.body.price,
    stock: req.body.stock,
    rating: req.body.rating,
    description: req.body.description,
    tax: req.body.tax,
    product_type: req.body.product_type,
    price_incl_tax: req.body.price_incl_tax,
    availability: req.body.availability,
    num_reviews: req.body.num_reviews,
    image_url: req.body.image_url,
  });

  try {
    newBook.save().then((resp) => {
      res.send({
        message: "Book added successfully",
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
    if (!book)
      return res.status(404).send({
        error: "Book not found",
      });

    // Decode Base64 fields
    const decodedBook = {
      title: decodeBase64(book.title),
      price: decodeBase64(book.price),
      rating: decodeBase64(book.rating),
      stock: decodeBase64(book.stock),
      image_url: decodeBase64(book.image_url),
      // Include other fields as needed, decoded or as is
      description: decodeBase64(book.description), // Assuming description is not encoded
      tax: decodeBase64(book.tax),
      product_type: decodeBase64(book.product_type),
      price_incl_tax: decodeBase64(book.price_incl_tax),
      availability: decodeBase64(book.availability),
      num_reviews: decodeBase64(book.num_reviews),
    };

    res.send(decodedBook);
  } catch (err) {
    res.status(400).send({
      error: "Invalid ID",
    });
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

    if (!book)
      return res.status(404).send({
        message: "Book not found",
      });
    res.send(book);
  } catch (err) {
    res.status(400).send({
      error: "Invalid ID",
    });
  }
});

// Delete a book
router.post("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndRemove(req.body.id);
    if (!book)
      return res.status(404).send({
        message: "Book not found",
      });
    res.send(book);
  } catch (err) {
    res.status(400).send({
      error: "Invalid ID",
    });
  }
});

module.exports = router;
