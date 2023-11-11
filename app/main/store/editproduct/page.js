"use client";
import { API } from "@/Essentials";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);
  const [desc, setDesc] = useState("");
  const [quantity, setQuanity] = useState("");
  const [price, setPrice] = useState("");
  const [selectImage, setSelectImage] = useState([]);
  const [change, setChange] = useState("----select type of product----");
  const [drop, setDrop] = useState(true);
  const [call, setCall] = useState(true);
  const [id, setId] = useState("");
  const [by, setBy] = useState(false);
  const [productId, setProductId] = useState();
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [discountedprice, setDiscountedprice] = useState("");
  const [type, setType] = useState("");

  const product = searchParams.get("product");
  const userid = searchParams.get("id")
  const collectionid = searchParams.get("collectionid")

  useEffect(() => {
    fetchproduct();
  }, []);

  console.log(userid, product)
  const fetchproduct = async () => {
    try {
      const res = await axios.get(`${API}/getaproduct/${product}`);
      setData(res.data);
      console.log(res.data.data.urls);
      setName(res?.data?.data?.product?.name);
      setDesc(res?.data?.data?.product?.desc);
      setPrice(res?.data?.data?.product?.price);
      setQuanity(res?.data?.data?.product?.quantity);
      setDiscountedprice(res?.data?.data?.product?.discountedprice);
      setType(res?.data?.data?.product?.type);
      setSelectImage([res?.data?.data?.urls[0]]);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(selectImage)
  const handleImageChange = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files);
    const combinedImages = [...selectedImage, ...newImages];

    // Limit the number of images to 4
    const limitedImages = combinedImages.slice(0, 4);

    setSelectedImage(limitedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/updateaproduct/${userid}/${collectionid}/${product}`, {
        name,
        price,
        desc,
        discountedprice,
        quantity,
        selectImage,
      });
      // const response = await axios.post(`${API}/updateaproduct/${userid}/6538d9c60acfecc467b33796/${product}`, {
      //   name,
      //   price,
      //   desc,
      //   discountedprice,
      //   quantity,
      //   selectImage,
      // });
      console.log(response.data)
      router.push("/main/store");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = useCallback(() => {
    setChange("Physical Product");
    setDrop(true);
    setCall(false);
  }, []);
  const handle = useCallback(() => {
    setChange("Digital product or service");
    setDrop(true);
    setCall(true);
  }, []);

  return (
    <div className=" pt-1 pb-20">
      {/**popUp */}
      <div
        className={`${by
          ? "h-[90vh] w-[85%] rounded-2xl flex items-center justify-center absolute duration-100"
          : "h-0 w-0 duration-100 hidden"
          }`}
      >
        <div
          className={`${by
            ? "h-48 w-80 bg-[#F9F9F9] vs:max-sm:ml-10 shadow-2xl sm:bg-white sm:shadow-[0_3px_12px_1px_rgba(0,0,0,0.5)] rounded-3xl flex flex-col items-center justify-center duration-100"
            : "h-0 w-0 duration-100 text-[0px] hidden"
            }`}
        >
          <div className="font-semibold">Sure you want to Discard?</div>
          <div className="text-[12px]">
            Are you sure you want to Discard this?
          </div>
          <div className="flex gap-4 mt-4">
            <div
              onClick={() => setBy(false)}
              className="ring-1 cursor-pointer ring-black px-6 py-2 rounded-2xl hover:bg-black hover:text-white"
            >
              No, cancel
            </div>
            <Link
              href="/main/store"
              className=" px-6 py-2 cursor-pointer rounded-2xl bg-black text-white hover:bg-[#3f3f3f]"
            >
              Yes, Confirm
            </Link>
          </div>
        </div>
      </div>

      {/**head*/}
      <div className="flex justify-between items-center ">
        <div className="sm:font-medium sm:pl-4 text-[18px]  text-[#8B8D97]  ">
          edit product
        </div>
        <div className="flex gap-8 items-center">
          <div className="font-semibold" onClick={() => setBy(true)}>
            Discard
          </div>
          <div
            onClick={handleSubmit}
            className="px-12 vs:max-sm:px-10 py-2 font-semibold bg-[#002EFF] text-white rounded-3xl"
          >
            Update
          </div>
        </div>
      </div>

      {/**main */}
      <div className="">
        <div className="sm:flex justify-center gap-4 pt-10">
          <div className="w-[100%] sm:w-[50%] flex flex-col sm:items-center">
            <div className="vs:max-sm:px-10 sm:w-[50%] min-w-[250px]">
              <div>
                <div className="font-semibold pt-4">Product name</div>
                <input
                  className="outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10 w-[100%]"
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="text-[#828282] text-[12px] pt-2 ">
                  Give Your Product a short and clear name.
                </div>
                <div className="font-semibold pt-4">Media</div>
                <div className=" rounded-[25px] border-dotted border-2 w-[100%] mt-2 px-2 ">
                  <div className="flex space-x-3 h-20 px-9">
                    {/* <> {selectedImage.map((i, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(i)}
                        className="h-20 w-20 pt-2 rounded-xl sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#f0f0f0]"
                        alt={`Selected ${index}`}
                      />
                    ))}</> */}

                    {selectImage ? <img
                      src={selectImage}
                      className="h-20 w-20 pt-2 rounded-xl sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#f0f0f0]"
                      alt={`Selected `}
                    /> : <> {selectedImage.map((i, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(i)}
                        className="h-20 w-20 pt-2 rounded-xl sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#f0f0f0]"
                        alt={`Selected ${index}`}
                      />
                    ))}</>}
                  </div>
                  <div className=" py-3">
                    <div className="h-20 bg-gray-200 mt-2 rounded-[20px]">
                      <div className="sm:pl-[10%] pt-3 flex justify-center items-center">
                        <form>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className=" w-[105px]"
                          />
                        </form>
                      </div>
                      <div className="flex text-[10px] justify-center items-center pt-1">
                        you can add upto
                        <div className="slm:max-sm:hidden px-1">4</div>to
                        <div className="sm:hidden px-1">3</div> images
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-[#828282] text-[12px] pt-2 ">
                  Used to represent your product during checkout , in Community
                  ,social sharing and more.
                </div>
                <div className="font-semibold pt-4 flex justify-between ">
                  Description
                  <p className="font-normal text-[14px] -pl-2 ">
                    {desc.length}/ 500
                  </p>
                </div>
                <textarea
                  className="outline-none px-3 pt-3 mt-2 bg-[#F4F5F7] scrollbar-hide resize-y rounded-[25px] w-[100%] h-48 "
                  type="text"
                  placeholder="Describe the product in few words"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  maxLength={500}
                />
                <div className="text-[#828282] text-[12px]  ">
                  Give Your Product a short and clear description.
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] sm:w-[50%] flex flex-col sm:items-center">
            <div className=" vs:max-sm:px-10 sm:w-[50%] min-w-[250px]">
              <div className=" ">
                <div className="flex  ">
                  <div>
                    <div className="font-semibold pt-4">Price</div>
                    <input
                      className="outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10 w-[90%]"
                      type="text"
                      placeholder="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <div className="font-semibold pt-4">Discounted Price</div>
                    <input
                      value={discountedprice}
                      onChange={(e) => setDiscountedprice(e.target.value)}
                      className="outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10 w-[90%]"
                      type="text"
                      placeholder="Discounted"
                    />
                  </div>
                </div>

                <div className={`font-semibold mt-4`}>Product type</div>
                <div className="pt-2">
                  <div
                    className={`outline-none flex pl-3 items-center bg-[#F4F5F7] h-10 w-[100%] ${drop ? "rounded-[12px]" : "rounded-t-[12px]"
                      }`}
                    onClick={() => setDrop(!drop)}
                  >
                    {change}
                  </div>
                  <div
                    className={`bg-[#F4F5F7] rounded-b-2xl w-[100%] ${drop ? "h-0 text-[0px] duration-75" : " duration-75"
                      }`}
                  >
                    <div
                      className="flex items-center pl-3 h-10 "
                      onClick={handleClick}
                    >
                      Physical Product
                    </div>
                    <div
                      className=" flex items-center pl-3 h-10 "
                      onClick={handle}
                    >
                      Digital product or service
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <input
                      className={`${call
                        ? "hidden"
                        : "outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10 w-[40%]"
                        }`}
                      type="text"
                      placeholder="0.0"
                    />
                    <select
                      className={`${call
                        ? "hidden"
                        : "outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10"
                        }`}
                    >
                      <option>kg</option>
                      <option>mg</option>
                      <option>18%</option>
                      <option>28%</option>
                    </select>
                  </div>
                </div>
                {type ? (
                  <div className="text-[#828282] text-[12px] pt-2 ">
                    Current- {type === "physical" ? "Physical" : "Digital"}
                  </div>
                ) : null}

                <div className="font-semibold pt-4">Qty</div>
                <input
                  className="outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10 w-[100%]"
                  type="text"
                  placeholder="Product Qty"
                  value={quantity}
                  onChange={(e) => setQuanity(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
