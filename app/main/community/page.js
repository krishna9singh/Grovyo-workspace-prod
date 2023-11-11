"use client";
import React, { useEffect, useState } from "react";
import Communitybox from "./Communitybox";
import axios from "axios";
import { API } from "@/Essentials";
import Link from "next/link";
import Image from "next/image";
import Authcheck from "@/Authcheck";
import Empty from "../../assets/image/emptyCommunity.png";

function page() {
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [success, setSucess] = useState();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const id = sessionStorage.getItem("id");
      setId(id);
      setLoad(false);
      await axios
        .get(`${API}/allcoms/${id}`)
        .then(function (res) {
          if (res.data.success) {
            // handle success
            const com = res.data.Com;
            const dp = res.data.dps;
            console.log(res.data);
            const merged = com.map((c, i) => ({
              c,
              dps: dp[i],
              a: i,
            }));

            setData(merged);
            setSucess(true);
            setLoad(true);
          } else {
            setSucess(false);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
    fetch();
  }, []);


  // const handleEdit = async ({ id }) => {
  //   try {
  //     console.log(id)
  //     const res = await axios.post(`${API}/edit/${id}`, { data })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleDelete = async ({ dat, id, index }) => {
    try {
      const updatedData = data?.filter((d, i) => i !== index)
      setData(updatedData)
      const res = await axios.post(`${API}/delete/${id}`)
    } catch (e) {
      console.log(e)
    }
    console.log("deleted")
  }

  if (load) {
    if (success) {
      return (
        <div>
          <div className=" pt-1 ">
            <div className="flex px-4 justify-between items-center">
              <div className=" text-[18px] font-medium text-[#8B8D97]  ">
                Community
              </div>
              <Link
                href="/main/community/createCommunity"
                className="py-2 vs:max-sm:hidden px-6 bg-blue-600 text-white rounded-xl"
              >
                Create community
              </Link>
            </div>
            <div className="sm:px-16">
              <div className="flex w-full justify-between vs:max-sm:hidden mt-8">
                <div className="w-64 sm:max-md:w-52 font-semibold flex pl-10">
                  Name
                </div>
                <div className="w-36 sm:max-md:w-24 flex font-semibold justify-center">

                </div>
                <div className="w-40 sm:max-md:w-24 flex font-semibold justify-center">
                  Members
                </div>
                <div className="w-36 sm:max-md:w-24 flex font-semibold justify-center">
                  Topics
                </div>
                <div className="w-36 flex font-semibold justify-center"></div>
              </div>

              {data.map((d, i) => (
                <div key={i} className="sm:pt-4">
                  <Communitybox data={d} index={i} id={id} handleDelete={handleDelete} />
                </div>
              ))}</div>
            <Link
              href="/main/community/createCommunity"
              className="animate-bounce sm:hidden h-12 w-12  bg-blue-700 rounded-full flex justify-center items-center fixed right-5 sm:right-10 bottom-20 cursor-pointer"
            >
              <div className="text-white text-[30px] font-semibold">+</div>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="overflow-auto pt-2 scrollbar-hide flex flex-col items-center justify-center h-[80vh] sm:mx-5 ">
            <Image src={Empty} className="h-96 w-96" alt="create community" />
            <div className="font-semibold text-[18px] mt-6">
              Create your community
            </div>
            <div>
              The best way to get started is to quit talking and begin doing
            </div>
            <Link
              href="/main/community/createCommunity"
              className="py-2 px-6 bg-blue-600 text-white rounded-2xl mt-6"
            >
              Create community
            </Link>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div>
        <div className="overflow-auto pt-1 scrollbar-hide h-full ">
          <div className="flex justify-between items-center">
            <div className="sm:font-medium sm:pl-4 text-[18px] animate-pulse px-10 py-4 bg-[#f2f2f2] rounded-2xl text-[#8B8D97]"></div>
            <Link
              href="/main/store/addproduct"
              className="vs:max-sm:hidden  animate-pulse px-10 py-4  bg-[#f2f2f2] text-white rounded-2xl"
            ></Link>
          </div>

          <div className="pt-4">
            <div className="flex w-full vs:max-sm:hidden sm:pt-4 px-4 justify-between">
              <div className="w-64 sm:max-md:w-52 bg-[#f2f2f2]  animate-pulse font-medium flex justify-start "></div>
              <div className="w-36 sm:max-md:w-24 bg-[#f2f2f2] animate-pulse flex justify-center font-medium "></div>
              <div className="w-36  sm:max-md:w-24 bg-[#f2f2f2] animate-pulse flex justify-center font-medium "></div>
              <div className="w-36 sm:max-md:w-24 bg-[#f2f2f2] animate-pulse flex justify-center font-medium "></div>
              <div className="w-36 sm:max-md:w-24 flex justify-center font-medium "></div>
            </div>
            <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
            <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
            <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
            <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
            <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
            <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
            <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
            <div className="bg-[#f2f2f2] animate-pulse h-20 sm:rounded-2xl mt-4"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Authcheck(page);
