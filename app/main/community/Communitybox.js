"use client";
import { API } from "@/Essentials";
import { editcom } from "@/app/redux/slice/editcommunity";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { useDispatch } from "react-redux";

function Communitybox({ data, id, index, handleDelete }) {
  const [open, setOpen] = useState(true);
  const router = useRouter()
  const href = `/main/community/editCommunity?id=${id}&comid=${data?.c?._id}`;
  const dispatch = useDispatch()

  const handleEdit = async () => {
    try {
      dispatch(editcom(data))
    }
    catch (e) {
      console.log(e)
    }
  }


  return (
    <div
      className={`px-4 sm:bg-[#ffffff] sm:shadow-sm sm:mx-2 hover:bg-[#f9f9f9] py-3 sm:rounded-3xl duration-75 ${open ? "bg-[#fff]" : ""
        }`}
    >
      <div className="flex items-center w-full justify-between font-semibold ">
        <div className="flex items-center space-x-3 w-64 sm:max-md:w-52">
          <img
            src={data?.dps}
            alt="dp"
            height={100}
            width={100}
            className="h-14 w-14 cursor-pointer flex justify-center items-center rounded-[24px] ring-1 ring-white shadow-[0_3px_10px_2px_rgba(1,1,1,0.1)]"
          />
          <div>
            <div className="md:w-36 sm:max-md:w-24 font-medium">
              {data?.c?.title}
            </div>
            <div className="sm:hidden text-[12px]  font-medium">
              {"by "}
              {data?.c?.creator?.fullname}
            </div>
          </div>
        </div>
        <div className="vs:max-sm:hidden justify-center flex sm:max-md:w-20 w-36"></div>
        <div className="vs:max-sm:hidden justify-center sm:max-md:w-24 flex w-36">
          {data?.c?.memberscount}
        </div>
        <div className="vs:max-sm:hidden justify-center sm:max-md:w-36 flex w-36">
          {data?.c?.totaltopics}
        </div>
        <div className="flex justify-between items-center sm:max-md:w-24 w-32">

          {/* edit community */}
          <div className="cursor-pointer" onClick={() => {
            handleEdit(data)
          }} >
            <Link href={href} title="Edit" className=" text-blue-600 ">
              <FiEdit3 />
            </Link>
          </div>
          <div className="cursor-pointer" title="Analytics">
            <TbBrandGoogleAnalytics onClick={() => setOpen(!open)} />
          </div>

          {/* delete community */}
          <div className="cursor-pointer" onClick={() => handleDelete({ dat: data, id: data?.c?._id, index: index })}>
            <RiDeleteBin6Line className="py-2 px-2 bg-red-500 rounded-2xl text-white w-8 h-8" />
          </div>
        </div>
      </div>
      <div
        className={`sm:grid-cols-4 grid-cols-2 grid ${open ? "" : " gap-2 pt-4 pl-[4%]"
          }`}
      >
        <div
          className={`${open
            ? "h-0 w-72 text-[0px] vs:max-lg:w-40"
            : "h-36 w-72 flex items-center px-10 font-semibold vs:max-lg:w-40 bg-[#FEF2E8] rounded-3xl duration-150"
            }`}
        >
          <div className="w-[100%]">
            <div className={`${open ? "text-[0px]" : "text-[16px]"}`}>
              Total member
            </div>
            <div className="flex justify-between w-[100%] items-center">
              <div className={`${open ? "text-[0px]" : "text-[29px]"}`}>0</div>
              <div>+00.0%</div>
            </div>
          </div>
        </div>
        <div
          className={`${open
            ? "h-0 w-72 text-[0px] vs:max-lg:w-40"
            : "h-36 w-72 flex items-center  px-10 font-semibold vs:max-lg:w-40 bg-[#F1F8EC] rounded-3xl duration-150"
            }`}
        >
          <div className="w-[100%]">
            <div className={`${open ? "text-[0px]" : "text-[16px]"}`}>
              Visitors
            </div>
            <div className="flex justify-between w-[100%] items-center">
              <div className={`${open ? "text-[0px]" : "text-[29px]"}`}>0</div>
              <div>+00.0%</div>
            </div>
          </div>
        </div>
        <div
          className={`${open
            ? "h-0 w-72 text-[0px] vs:max-lg:w-40"
            : "h-36 w-72 flex items-center  px-10 font-semibold vs:max-lg:w-40 bg-[#F2F0FE] rounded-3xl duration-150"
            }`}
        >
          <div className="w-[100%]">
            <div className={`${open ? "text-[0px]" : "text-[16px]"}`}>
              New member
            </div>
            <div className="flex justify-between w-[100%] items-center">
              <div className={`${open ? "text-[0px]" : "text-[29px]"}`}>0</div>
              <div>+00.0%</div>
            </div>
          </div>
        </div>
        <div
          className={`${open
            ? "h-0 w-72 text-[0px] vs:max-lg:w-40"
            : "h-36 w-72 flex items-center  px-10 font-semibold vs:max-lg:w-40 bg-[#EAEEF6] rounded-3xl duration-150"
            }`}
        >
          <div className="w-[100%]">
            <div className={`${open ? "text-[0px]" : "text-[16px]"}`}>
              Avg Posts Impression
            </div>
            <div className="flex justify-between w-[100%] items-center">
              <div className={`${open ? "text-[0px]" : "text-[29px]"}`}>0</div>
              <div>+00.0%</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        {/* <div
          className={`${
            select
              ? "text-[0px] h-0 w-0 duration-75"
              : "flex flex-col items-center justify-center vs:max-sm:bg-[#f9f9f9] bg-white py-4 px-2 rounded-2xl absolute "
          }`}
        >
          <div>
            <Link href={href} title="Edit" className=" text-blue-600 ">
              Edit
            </Link>
          </div>
          <div>Delete</div>
        </div> */}
      </div>
    </div >
  );
}

export default Communitybox;
