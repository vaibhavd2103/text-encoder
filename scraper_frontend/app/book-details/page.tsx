"use client";

import { backend_URL } from "@/constants/constants";
import { BookDetails } from "@/types/book.types";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Lottie from "react-lottie";
import * as animationData from "../../assets/loader.json";
import { text_numbers } from "@/utils/text_to_number";

function BookDetailsPage() {
  const searchParams = useSearchParams();
  const bookID = searchParams.get("id");

  const [bookDetails, setBookDetails] = useState<BookDetails>();
  const [loading, setLoading] = useState(true);

  async function getBookDetails() {
    try {
      const res = await axios.get(`${backend_URL}/${bookID}`);
      console.log(res.data);
      setBookDetails(res.data);
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }

  useEffect(() => {
    getBookDetails();
  }, [bookID]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const ratingMapper = (bookDetails: BookDetails) => {
    let rating = 0;
    const index = text_numbers.findIndex(
      (num) =>
        num.title === bookDetails.rating.toLowerCase() ||
        num.count.toString() === bookDetails.rating
    );
    if (index >= 0) {
      rating = index + 1;
      return `${rating} stars`;
    } else {
      return "No rating";
    }
  };

  return (
    <Suspense>
      <div className="w-screen h-full p-4">
        {loading ? (
          <div className="h-screen w-screen flex justify-center items-center">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        ) : (
          bookDetails && (
            <div>
              <div className="flex items-center gap-4 justify-center">
                <img
                  src={bookDetails.image_url}
                  alt="book_image"
                  className="h-[500px] aspect-[9/16] max-h-[300px] object-cover group-hover:scale-110 [transition-duration:500ms] [transition-delay:250ms]"
                />
                <div className="flex flex-col gap-1">
                  <h1 className="text-3xl text-black font-bold font-sans mb-2">
                    {bookDetails.title}
                  </h1>

                  <p className="text-neutral-500">
                    Rating:
                    <span className="text-black font-bold">
                      {` ${ratingMapper(bookDetails)}`}
                    </span>
                  </p>
                  <p className="text-neutral-500">
                    Reviews:{" "}
                    <span className="text-black font-bold">
                      {bookDetails.num_reviews}
                    </span>
                  </p>
                  <p className="text-neutral-500">
                    Price:{" "}
                    <span className="text-black font-bold">
                      {bookDetails.price}
                    </span>
                  </p>
                  <p className="text-neutral-500">
                    Tax:{" "}
                    <span className="text-black font-bold">
                      {bookDetails.tax}
                    </span>
                  </p>
                  <p className="text-neutral-500">
                    Price incl. tax:{" "}
                    <span className="text-black font-bold">
                      {bookDetails.price_incl_tax}
                    </span>
                  </p>
                  <p className="text-neutral-500">
                    Availability:{" "}
                    <span className="text-black font-bold">
                      {bookDetails.availability}
                    </span>
                  </p>
                  <p className="text-neutral-500">
                    Product type:{" "}
                    <span className="text-black font-bold">
                      {bookDetails.product_type}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 py-2 border ">
                <p className="font-bold text-xl">Product description</p>
                <p className="text-neutral-500">{bookDetails.description}</p>
              </div>
            </div>
          )
        )}
      </div>
    </Suspense>
  );
}

export default BookDetailsPage;
