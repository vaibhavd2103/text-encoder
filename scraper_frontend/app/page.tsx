"use client";

import { backend_URL } from "@/constants/constants";
import axios from "axios";
import React, { useEffect } from "react";

function Home() {
  const getBooks = async () => {
    try {
      axios.get(backend_URL).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default Home;
