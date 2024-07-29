"use client";

import { backend_URL } from "@/constants/constants";
import { BookDetails } from "@/types/book.types";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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

  console.log(bookID);
  return (
    <div className="w-screen h-full p-4">
      {loading ? (
        <div>
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      ) : (
        bookDetails && (
          <div>
            <h1 className="text-3xl mb-6 text-black font-bold text-center font-sans [text-shadow:_0px_0px_10px_rgb(2_132_199_/_100%)]">
              {bookDetails.title}
            </h1>
            <div className="flex items-center gap-4 justify-center">
              <img
                src={bookDetails.image_url}
                alt="book_image"
                className="h-[900px] aspect-[9/16] max-h-[300px] object-cover group-hover:scale-110 [transition-duration:500ms] [transition-delay:250ms]"
              />
              <div className="flex flex-col gap-2">
                <p className="line-clamp-6">{bookDetails.price}</p>
                <p className="line-clamp-6">{bookDetails.availability}</p>
                <p className="line-clamp-6">{bookDetails.product_type}</p>
                <p className="line-clamp-6">
                  {text_numbers.findIndex(
                    (num) => num === bookDetails.rating.toLowerCase()
                  ) + 1}
                </p>
                <p className="line-clamp-6">{bookDetails.price_incl_tax}</p>
                <p className="line-clamp-6">{bookDetails.num_reviews}</p>
                <p className="line-clamp-6">{bookDetails.tax}</p>
              </div>
            </div>
            <div className="mt-6 p-4 py-2 border">
              <p>{bookDetails.description}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default BookDetailsPage;
