"use client";

import { backend_URL } from "@/constants/constants";
import { Book } from "@/types/book.types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import * as animationData from "../assets/loader.json";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Home() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getBooks = async () => {
    try {
      axios.get(backend_URL).then((res) => {
        console.log(res.data);
        setBooks(res.data);
      });
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="bg-white p-6 flex flex-col w-full h-full">
      <h1 className="text-6xl text-sky-600 font-bold font-mono text-center mb-6 [text-shadow:_0px_0px_20px_rgb(2_132_199_/_100%)]">
        BiblioTech
      </h1>
      {loading ? (
        <div className="h-[calc(100vh-150px)] w-full flex flex-col justify-center items-center">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      ) : (
        <div className="w-full flex flex-col">
          <div className="grid grid-cols-3 gap-2 md:gap-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 w-full">
            {books.map((item) => {
              return (
                <div
                  key={item.title}
                  className="group bg-sky-100 rounded-xl w-full overflow-hidden hover:scale-105 transition-all hover:shadow-2xl hover:shadow-black border-[2px] border-neutral-300 [transition-duration:500ms]"
                >
                  <div className="max-h-[300px] overflow-hidden border-b-[2px] border-b-neutral-300">
                    <img
                      src={item.image_url}
                      alt="book_image"
                      className="w-full aspect-[9/16] max-h-[300px] object-cover group-hover:scale-110 [transition-duration:500ms] [transition-delay:250ms]"
                    />
                  </div>
                  <div className="p-2 flex flex-col items-center">
                    <p className="line-clamp-1 text-center w-full">
                      {item.title}
                    </p>
                    <p className="text-sky-900 font-bold">{item.price}</p>
                    <p className="text-sm">
                      {item.stock.indexOf("In") >= 0
                        ? "Available"
                        : "Out of stock"}
                    </p>
                    <Link
                      href={{
                        pathname: "/book-details",
                        query: {
                          id: item._id,
                        },
                      }}
                    >
                      <button
                        onClick={() => {
                          // router.push("book-details");
                        }}
                        className="rounded-lg text-sm bg-sky-600 py-1 px-4 align-middle hover:bg-sky-700 transition-all w-full mt-2 text-white"
                      >
                        View details
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex self-center mt-8">
            <p>Pagination</p>
          </div>
          <button className="rounded-lg bg-sky-800 font-bold py-2 px-6 hover:bg-sky-900 transition-all mt-2 text-white self-center">
            Add new book
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
