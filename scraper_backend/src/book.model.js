const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: String,
    price: String,
    stock: String,
    rating: String,
    description: String,
    tax: String,
    product_type: String,
    price_incl_tax: String,
    availability: String,
    num_reviews: String,
    image_url: String,
  },
  { collection: "books" }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
