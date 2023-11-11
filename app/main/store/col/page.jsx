"use client";
import { API } from "@/Essentials";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const page = () => {
  const [data, setData] = useState([]);

  return (
    <>
      <div>
        <div className="grid grid-cols-1 w-full p-[3%]">
          <div className="w-full">
            <div className="w-full flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div>collection</div>
                <div className="p-3 px-6 bg-black text-white rounded-lg">
                  Add Product
                </div>
              </div>
              {data?.map((d, i) => (
                <div className="flex justify-center p-4  items-center w-full border-2">
                  <div className="w-full">{d?.collection?.name}</div>
                  <div className="w-full">10</div>
                  <div className="w-full">₹121.00</div>
                  <div className="w-full">Low Stock</div>
                  <div className="w-full">29 Dec 2022</div>
                  <div className="flex justify-center items-center gap-4">
                    <div className="w-full">Edit</div>
                    <div className="w-full">Delete</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
