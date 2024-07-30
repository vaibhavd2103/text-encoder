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
  const [image_url, setImage_url] = useState("");

  async function addNewBook() {
    try {
      const newBookData = {
        title: title,
        price: price,
        stock: stock,
        rating: rating,
        description: description,
        tax: tax,
        product_type: product_type,
        price_incl_tax: price + tax,
        availability: availability,
        num_reviews: "0",
        image_url: image_url,
      };
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${backend_URL}/addbook`,
        data: newBookData,
      };
      console.log(newBookData);
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
      <p className="mb-4 text-2xl font-bold [text-shadow:_0px_5px_5px_rgb(2_132_199_/_50%)]">
        Add new book
      </p>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Enter book title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-neutral-200 px-2 py-1 rounded-lg"
        />
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 border-neutral-200 px-2 py-1 rounded-lg"
        />
        <input
          type="text"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border-2 border-neutral-200 px-2 py-1 rounded-lg"
        />
        <input
          type="text"
          placeholder="Enter stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border-2 border-neutral-200 px-2 py-1 rounded-lg"
        />
        <input
          type="text"
          placeholder="Enter rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border-2 border-neutral-200 px-2 py-1 rounded-lg"
        />
        <input
          type="text"
          placeholder="Enter tax"
          value={tax}
          onChange={(e) => setTax(e.target.value)}
          className="border-2 border-neutral-200 px-2 py-1 rounded-lg"
        />
        <input
          type="text"
          placeholder="Enter product type"
          value={product_type}
          onChange={(e) => setProduct_type(e.target.value)}
          className="border-2 border-neutral-200 px-2 py-1 rounded-lg"
        />
        <input
          type="text"
          placeholder="Enter availability"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="border-2 border-neutral-200 px-2 py-1 rounded-lg"
        />
        <input
          type="text"
          placeholder="Provide Image URL"
          value={image_url}
          onChange={(e) => setImage_url(e.target.value)}
          className="border-2 border-neutral-200 px-2 py-1 rounded-lg"
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
