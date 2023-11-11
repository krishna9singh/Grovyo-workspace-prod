import React, { useEffect } from "react";
import { useState } from "react";
import Togglebutton from "../../components/togglebutton";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";
import { API } from "@/Essentials";

function productinformation({ handleDelete, data, userid, collectionid, index }) {

  const [change, setChange] = useState(true);
  const [mark, setMark] = useState(true);
  const href = `/main/store/editproduct?id=${userid}&collectionid=${collectionid}&product=${data?._id}`;


  function getQueryParameters(url) {
    const queryString = url.split('?')[1];
    if (queryString) {
      const params = queryString.split('&');
      const queryParams = {};
      params.forEach(param => {
        const [key, value] = param.split('=');
        queryParams[key] = value;
      });
      return queryParams;
    } else {
      return {};
    }
  }

  // Get the query parameters
  const queryParams = getQueryParameters(href);

  // Get the 'id' parameter value
  const getid = queryParams.id;
  const pid = queryParams.product;
  const collecid = queryParams.collectionid;

  // const datas = {
  //   buildingno: "buildingno",
  //   city: "kanpur",
  //   state: "uttar pradesh",
  //   postal: 900900,
  //   landmark: "buildingno",
  //   gst: 18,
  //   businesscategory: "businesscategory",
  //   documenttype: "buildingno",
  //   documentfile: "buildingno",
  // }

  // useEffect(() => {
  //   axios.post(`${API}/registerstore/${getid}`, datas).then((res) => console.log(res.data)).catch((Error) => {
  //     console.log(Error)
  //   })

  // }, [])
  // useEffect(() => {
  //   axios.post(`${API}/createCollection/${getid}`, datas).then((res) => console.log(res.data)).catch((err) => {
  //     console.log(err)
  //   })
  // }, [])

  return (
    <div className="w-full">
      <div className=" flex items-center vs:max-sm:px-[2.6%] hover:bg-white bg-[#f9f9f9] sm:mx-2 sm:px-[1%] sm:rounded-[20px] py-3 justify-between">
        {/** */}
        <div className="flex space-x-3 w-64 sm:max-md:w-52 items-center">
          <img
            src={data?.urls}
            alt="url"
            height={140}
            width={140}
            className="h-14 w-14 cursor-pointer flex justify-center items-center rounded-[10px] ring-1 ring-white shadow-[0_3px_10px_2px_rgba(1,1,1,0.1)]"
          />

          {/**phone */}
          <div className="">
            <div className="font-semibold vs:max-sm:text-[16px]">
              {data?.name}
            </div>
            <div className="text-[12px] font-medium vs:max-sm:hidden">
              Sold by {data?.brandname}
            </div>
            <div className="sm:hidden flex">
              <strike className="text-gray-500 text-[13px] flex items-center">
                {data?.price}
              </strike>
              <div className="font-semibold text-[18px]">
                {data?.discountedprice}
              </div>
            </div>
          </div>
        </div>
        {/*web */}
        <>
          <div className="vs:max-sm:hidden w-36  flex justify-center ">
            <strike className="text-gray-500 text-[13px]">
              {data?.price}
            </strike>
            <div className="font-semibold text-[18px]">
              {data?.discountedprice}
            </div>
          </div>
          <div className="vs:max-sm:hidden sm:max-md:w-24  sm:max-md:justify-start w-36 flex justify-center ">
            <div className="space-y-4">
              <div className="vs:max-sm:hidden">{data?.quantity}</div>
            </div>
          </div>
        </>
        {/** */}
        <div className=" justify-center items-center    sm:max-md:pr-10 space-x-1 w-36 mt-2 flex-col flex vs:max-sm:hidden">
          <div
            onClick={() => {
              setChange(!change);
            }}
          >
            <Togglebutton />
          </div>
          <div
            className={`${change === true
              ? "text-green-500 vs:max-sm:text-[12px] pt-1"
              : "hidden"
              }`}
          >
            In stock
          </div>
          <div
            className={`${change === false
              ? "text-red-500 vs:max-sm:text-[12px] pt-1"
              : "hidden"
              }`}
          >
            out of stock
          </div>
        </div>
        {/** */}

        <div
          onClick={() => {
            setMark(!mark);
          }}
          className="flex gap-3 items-center justify-end  md:w-36"
        >
          <Link href={href} title="Edit" className=" text-blue-600 ">
            <FiEdit3 size={20} />
          </Link>
          <div onClick={() => handleDelete(getid, pid, collecid, index)} className="cursor-pointer">
            <AiTwotoneDelete className="text-red-800" size={20} />
          </div>
        </div>
      </div>

      {/* <div className="w-full px-5 flex justify-end">
        <div
          className={`${mark
            ? "hidden"
            : "flex flex-col items-center justify-center vs:max-sm:bg-[#f9f9f9] bg-white py-4 px-2 rounded-2xl absolute "
            }`}
        >
          <div>
            <Link href={href} title="Edit" className=" text-blue-600 ">
              Edit
            </Link>
          </div>

        </div>
      </div> */}
    </div>
  );
}

export default productinformation;
