import { backend_URL } from "@/constants/constants";
import axios from "axios";
import React, { useState } from "react";

function NewBookForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [tax, setTax] = useState("");
  const [product_type, setProduct_type] = useState("");
  const [availability, setAvailability] = useState("");
  const [num_reviews, setNum_reviews] = useState("");
  const [image_url, setImage_url] = useState("");
  const [newBookData, setNewBookData] = useState({
    title: title,
    price: price,
    stock: stock,
    rating: rating,
    description: description,
    tax: tax,
    product_type: product_type,
    price_incl_tax: price + tax,
    availability: availability,
    num_reviews: num_reviews,
    image_url: image_url,
  });

  async function addNewBook() {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${backend_URL}/addbook`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        data: JSON.stringify(newBookData),
      };
      await axios.request(config);
      alert("Book added successfully!");
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      console.log("done");
    }
  }

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4">Add new book</p>
      <div>
        <input
          type="text"
          placeholder="Enter book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter description"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter price"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter stock"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter rating"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter tax"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter product type"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter availability"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Provide Image"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button
        className="px-8 py-2 bg-sky-800 rounded-xl text-white font-bold mt-4"
        onClick={addNewBook}
      >
        Add book
      </button>
    </div>
  );
}

export default NewBookForm;
