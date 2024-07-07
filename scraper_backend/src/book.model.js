const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  price: String,
  stock: String,
  rating: String,
  image: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
