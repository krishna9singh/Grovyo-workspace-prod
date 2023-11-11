"use client";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import Members from "./members";
import Access from "./access";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { API } from "@/Essentials";
import { BsInfoCircle } from "react-icons/bs";
import { useSelector } from "react-redux";

function page() {
  const data = useSelector(state => state.editcommunity)
  const [comopen, setComopen] = useState(3);
  const searchParams = useSearchParams();
  const [memberdata, setMemberdata] = useState([]);
  const [by, setBy] = useState(false);
  const [topicopen, setTopicopen] = useState(false);
  const [desc, setDesc] = useState(data?.c?.desc || "");
  const [topics, setTopics] = useState(false);
  const [topicTitle, setTopicTitle] = useState('');
  const [message, setmessage] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [change, setChange] = useState(1);
  const [selectImage, setSelectImage] = useState(data?.dps || null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState(data?.c?.title);
  const [selectedCategory, setSelectedCategory] = useState(data?.c?.category);
  const [leave, setLeave] = useState(false);
  const [topi, setTopi] = useState([]);

  const router = useRouter()
  const [topicdata, setTopicdata] = useState(data?.c?.topics || [])

  const id = searchParams.get("id")
  const comid = searchParams.get("comid")

  const handleImageChange = (e) => {
    setSelectImage(URL.createObjectURL(e.target.files[0]));
    setSelectedImage(e.target.files[0]);
  };

  useEffect(() => {

    if (id && comid) {
      const fetchmembers = async () => {
        try {
          const res = await axios.get(`${API}/members/${id}/${comid}`);
          const coms = res.data.members;
          const dps = res.data.dps;

          const merged = dps.map((d, i) => ({ d, c: coms[i], a: i }));
          setMemberdata(merged);
        } catch (e) {
          console.log(e.message);
        }
      };
      fetchmembers();
    }
  }, [searchParams]);

  // const handletopic = () => {
  //   setTopicopen(true);
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formDataToSend = new FormData();
  //   formDataToSend.append("image", selectedImage);
  //   formDataToSend.append("title", title);
  //   formDataToSend.append("category", selectedCategory);
  //   formDataToSend.append("desc", desc);
  //   if (topicTitle) {
  //     formDataToSend.append("topic", topicTitle);
  //     formDataToSend.append("type", type);
  //     formDataToSend.append("price", price);
  //   }
  //   try {
  //     const response = await axios.post(
  //       `${API}/createcom/${id}`,
  //       formDataToSend
  //     );
  //     router.push("/main/community");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSave = async () => {
    if (topicTitle && message && type) {
      const res = await axios.post(`${API}/createtopic/${id}/${comid}`, {
        title: topicTitle,
        message: message,
        type: type,
        price: price,
      });

      if (res.data.success) {
        setTopi((p) => [...p, topicTitle]);
        // setTopicopen(false);
        setTopicTitle("");
        setmessage("");
        setType("");
        setPrice("");
      }
    }
  };

  const handleEdit = async () => {
    const formDataToSend = new FormData()
    formDataToSend.append("image", selectImage);
    formDataToSend.append("title", title);
    formDataToSend.append("category", selectedCategory);
    formDataToSend.append("desc", desc);
    if (topicTitle) {
      formDataToSend.append("topic", topicTitle);
      formDataToSend.append("type", type);
      formDataToSend.append("price", price);
      formDataToSend.append("message", message);
    }
    try {
      console.log(id, comid)
      console.log(formDataToSend, "render")
      const res = await axios.post(`${API}/updatecommunity/${id}/${comid}`,

        formDataToSend
      )

      console.log(res.data)
      if (res.data.success) {
        console.log("success")
        router.push("/main/community")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handle = () => {
    setType("Free");
    setChange(1);
  };
  const handl = () => {
    setType("Paid");
    setChange(2);
  };
  const categories = [
    "Art",
    "Design",
    "Photography",
    "Fashion",
    "Music",
    "Writing",
    "Film and Video",
    "Crafts",
    "Cooking and Food",
    "Gaming",
    "Fitness and Wellness",
    "Beauty",
    "Technology",
    "Travel",
    "Education",
    "Lifestyle",
    "Parenting",
    "Sports",
    "DIY and Home Improvement",
    "Business",
    "Entrepreneurship",
    "Startups",
    "Marketing",
    "Sales",
    "Business Strategy",
    "Finance and Investing",
    "Leadership and Management",
    "Productivity and Time Management",
    "E-commerce",
    "Social Media Marketing",
    "Personal Branding",
    "Business Consulting",
    "Business Development",
    "Human Resources",
    "Negotiation",
    "Communication Skills",
    "Project Management",
    "Business Analytics",
    "Retail",
    "Merchandising",
    "Supply Chain Management",
    "Real Estate",
  ];
  return (
    <div>
      {/* popup 1 */}
      <div
        className={`${leave
          ? "h-[80vh] sm:h-[90vh] z-10 pn:max-sm:w-full w-[89%] bg-[#cccccc33] flex items-center justify-center absolute duration-100"
          : "h-0 w-0 duration-100 hidden"
          }`}
      >
        <div
          className={`${leave
            ? "h-48 w-80 bg-[#F9F9F9] px-2 sm:bg-white shadow-xl rounded-3xl flex flex-col items-center justify-center duration-100"
            : "h-0 w-0 duration-100 text-[0px] hidden"
            }`}
        >
          <div className="font-semibold">Sure you want to Discard?</div>
          <div className="text-[12px]">
            Are you sure you want to Discard this?
          </div>
          <div className="flex gap-4 mt-4">
            <div
              onClick={() => setLeave(false)}
              className="ring-1 cursor-pointer ring-black px-6 py-2 rounded-2xl hover:bg-black hover:text-white"
            >
              No, cancel
            </div>
            <Link
              href="/main/community"
              className=" px-6 py-2 cursor-pointer rounded-2xl bg-black text-white hover:bg-[#3f3f3f]"
            >
              Yes, Confirm
            </Link>
          </div>
        </div>
      </div>
      {/* popup 2 */}
      <div
        className={`${by
          ? "h-[80vh] sm:h-[90vh] pn:max-sm:w-full w-[89%] bg-[#cccccc33] z-50 flex items-center justify-center absolute duration-100"
          : "h-0 w-0 duration-100 hidden"
          }`}
      >
        <div
          className={`${by
            ? "h-80 p-6 bg-[#fff] ring-1 ring-[#f7f7f7] fixed pn:max-sm:bottom-0 gap-2 flex-wrap w-[100%] sm:w-96 shadow-md sm:bg-white rounded-3xl flex duration-100"
            : "h-0 w-0 duration-100 text-[0px] hidden"
            }`}
        >
          <div className="flex justify-between items-center px-2 w-full">
            <div className="font-semibold ">
              Select your Community Categorie
            </div>
            <RxCross1
              className="font-semibold"
              onClick={() => {
                setBy(false);
              }}
            />
          </div>
          <div className="overflow-auto scrollbar-hide h-60 bg-[#fff]  gap-2 flex-wrap w-[100%]  sm:bg-white  flex duration-100">
            {categories.map((c, i) => (
              <div
                onClick={() => {
                  setSelectedCategory(c);
                  setBy(false);
                }}
                key={i}
                className="p-2 m-1 bg-[#f6f6f6] rounded-xl flex gap-2 hover:bg-[#002EFF] hover:text-[#fff]"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* popup 3 */}
      <div
        className={`${topics
          ? "h-[80vh] sm:h-[90vh] pn:max-sm:w-full w-[89%] bg-[#cccccc33] z-50 flex items-center justify-center absolute duration-100"
          : "h-0 w-0 duration-100 hidden"
          }`}
      >
        <div
          className={`${topics
            ? "h-[450px] w-96 bg-[#F9F9F9] fixed px-4 pn:max-sm:bottom-0 py-4 sm:bg-white shadow-md rounded-3xl flex flex-col items-center justify-center duration-100"
            : "h-0 w-0 duration-100 text-[0px] hidden"
            }`}
        >
          {/* header */}
          <div className="flex justify-between px-4 font-semibold w-full  ">
            <div>Add a topic</div>
            <RxCross1
              className="font-semibold"
              onClick={() => {
                setTopics(false);
              }}
            />
          </div>
          <div className=" mt-4 h-80 ">
            <div className="mt-2">
              <div>Enter topic name </div>
              <input
                className="bg-slate-200 h-10 rounded-2xl w-full outline-none pl-2"
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <div>Welcome message </div>
              <input
                className="bg-slate-200 h-10 rounded-2xl w-full outline-none pl-2"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center mt-2">
              <div className="flex justify-between p-0.5 bg-[#f0f0f0] rounded-full items-center">
                <div
                  onClick={handle}
                  className={`${change === 1
                    ? "bg-white px-8 rounded-full py-2"
                    : "bg-transparent px-8 rounded-full py-2"
                    }`}
                >
                  Free
                </div>
                <div
                  onClick={handl}
                  className={`${change === 2
                    ? "bg-white px-8 rounded-full py-2"
                    : "bg-transparent  px-8 rounded-full py-2"
                    }`}
                >
                  Paid
                </div>
              </div>
            </div>
            <div
              className={`${change == 2
                ? "flex bg-slate-50 h-10 rounded-2xl w-full mt-2 items-center "
                : "hidden"
                }`}
            >
              <input
                className="bg-slate-200 h-10 rounded-2xl w-[70%] pl-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="add price"
              />
              <div className="flex justify-center w-[30%]">monthly </div>
            </div>
            <div className="flex px-4 text-[12px] mt-2">
              <BsInfoCircle className="m-0.5 w-5" />
              <span>
                Please be aware that covering paid topics does not enable
                monetization Click to know more.
              </span>
            </div>
          </div>

          <div
            onClick={() => {
              handleSave()
              setTopics(false)
            }}
            className="w-full rounded-xl py-2 bg-[#002eff] flex justify-center text-white font-semibold"
          >
            {" "}
            Save{" "}
          </div>
        </div>
      </div>

      <div className="overflow-auto overflow-x-hidden scrollbar-hide h-full ">
        <div className=" pt-1 pb-20">
          {/* Header */}
          <div className="flex justify-between items-center px-4">
            <div className="font-medium  text-[18px] text-[#8B8D97]">
              Edit community
            </div>
            {/* web save */}
            <div className="flex gap-8 pn:max-sm:hidden items-center">
              <div className="font-semibold" onClick={() => setLeave(true)}>
                Discard
              </div>
              {/* {edits == 1 ? */}
              <div
                onClick={handleEdit}
                className="px-10 py-2 font-semibold cursor-pointer bg-[#002EFF] text-white rounded-3xl"
              >
                Save
              </div>
              {/* :
               <div
                onClick={handleSubmit}
                className="px-10 py-2 font-semibold bg-[#002EFF] text-white rounded-3xl"
              >
                Save
              </div> */}

              {/* } */}
            </div>
          </div>
          {/* switcher */}
          <div className="w-full flex justify-center items-center select-none mt-2">
            <div className="h-10  bg-slate-100 rounded-3xl flex items-center px-2">
              <div
                onClick={() => {
                  setComopen(1);
                }}
                className={` duration-100 px-4 ${comopen === 1
                  ? "bg-white rounded-xl h-8 flex items-center justify-center font-semibold"
                  : "bg-none"
                  }`}
              >
                Overview
              </div>
              <div
                onClick={() => {
                  setComopen(2);
                }}
                className={` duration-100 px-4 ${comopen === 2
                  ? "bg-white rounded-xl h-8 flex items-center justify-center font-semibold"
                  : "bg-none"
                  }`}
              >
                Members
              </div>
              <div
                onClick={() => {
                  setComopen(3);
                }}
                className={` duration-100 px-4 ${comopen === 3
                  ? "bg-white rounded-xl h-8 flex items-center justify-center font-semibold"
                  : "bg-none"
                  }`}
              >
                Analytics
              </div>
            </div>
          </div>
          {/* phone save */}
          <div className="bg-white w-full h-12 rounded-t-2xl shadow-md sm:hidden fixed bottom-0 z-30 flex justify-between items-center px-6">
            <div
              className="px-10 py-2 font-semibold ring-2 ring-[#3e3e3e] rounded-2xl"
              onClick={() => setLeave(true)}
            >
              Discard
            </div>
            <div
              onClick={handleEdit}
              className="px-10 py-2 font-semibold ring-2 cursor-pointer ring-[#002eff] bg-[#002EFF] text-white rounded-2xl"
            >
              save
            </div>
          </div>
          <div>
            <div
              className={`${comopen === 1 ? "sm:flex justify-center gap-4 pt-10 " : "hidden"
                }`}
            >
              {/* left side */}
              <div className=" w-[100%] sm:w-[50%] flex flex-col sm:items-center">
                <div className="vs:max-sm:px-10 sm:w-[50%] min-w-[250px]">
                  {/* dp  */}
                  <div className="font-semibold pt-4">Community Profile</div>
                  <div className="flex flex-col justify-center gap-4 items-center ">
                    <div className="h-16 w-16 rounded-3xl mt-2 sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#ebedf3]">
                      {selectImage && (
                        <img
                          src={selectImage}
                          className="h-16 w-16 rounded-3xl sm:shadow-[0_1px_12px_2px_rgba(1,1,1,0.02)] bg-[#f0f0f0] container"
                          alt="Selected"
                        />
                      )}
                    </div>
                    <div className=" px-6 rounded-2xl font-semibold">
                      <form>
                        <input
                          id="inputTag"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="inputTag"
                          className="relative z-0 inline-block bg-gradient-to-br text-[#002eff] rounded-md px-2 py-1 outline-none whitespace-nowrap select-none cursor-pointer text-sm font-semibold "
                        >
                          change
                        </label>
                      </form>
                    </div>
                  </div>
                  <div className="">
                    <div className="font-semibold pt-4">Community name</div>
                    <input
                      className="outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10 w-[100%]"
                      type="text"
                      placeholder="Community Name"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="">
                    <div className="font-semibold pt-4">Categories</div>
                    <div
                      className={`"outline-none flex pl-3 justify-center mt-2 bg-[#F4F5F7] items-center rounded-[12px] h-10 w-[100%]"`}
                      onClick={() => setBy(!by)}
                    >
                      {selectedCategory}
                    </div>
                  </div>

                  <div className="font-semibold pt-4 flex justify-between ">
                    Description
                    <p className="font-normal text-[14px]  ">
                      {desc.length}/ 500
                    </p>
                  </div>
                  <textarea
                    className="outline-none px-3 pt-3 mt-2 bg-[#F4F5F7] w-[100%] scrollbar-hide resize-y rounded-[25px] h-48 "
                    type="text"
                    placeholder="Describe the product in few words"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    maxLength={500}
                  />
                </div>
              </div>
              {/* right side */}
              <div className=" w-[100%] sm:w-[50%] flex flex-col sm:items-center">
                <div className="vs:max-sm:px-10 sm:w-[50%] min-w-[250px]">
                  <div className="pt-4 flex justify-between items-center">
                    <div className="font-semibold ">Topics</div>
                    <div
                      onClick={() => setTopics(true)}
                      className="py-2 px-6  rounded-3xl sm:font-medium bg-[#002eff] text-white"
                    >
                      <span className="vs:max-sm:hidden">Add New Topics</span>
                      <span className="pl-1">+</span>
                    </div>
                  </div>
                  <div className="flex justify-between px-4 items-center mt-4">
                    <div>Topics</div>
                    <div>Name</div>
                    <div>Type</div>
                  </div>
                  <div className="flex justify-between px-4 bg-[#F4F5F7] rounded-xl py-2 items-center mt-2">
                    <div>topic #1</div>
                    <div>post</div>
                    <div >
                      default
                    </div>
                  </div>   <div className="flex justify-between px-4 bg-[#F4F5F7] rounded-xl py-2 items-center mt-2">
                    <div>topic #2</div>
                    <div>all</div>
                    <div >
                      default
                    </div>
                  </div>
                  {topicdata.slice(2)?.map((t, i) => (
                    <div key={i} className="flex justify-between px-4 bg-[#F4F5F7] rounded-xl py-2 items-center mt-2">
                      <div>topic #{i + 3}</div>
                      <div>{t?.title}</div>
                      <div className="flex justify-between gap-2">
                        <AiOutlineEdit onClick={() => { setTopics(true); handleSave() }} className="w-7 h-7  text-[#4362ec] rounded-2xl" />
                        <RiDeleteBin6Line className="py-2 px-2 bg-red-500 rounded-2xl text-white w-8 h-8" />
                      </div>
                    </div>

                  ))}


                  {topicTitle ? (
                    <div className="flex justify-between px-4 bg-[#F4F5F7] rounded-xl py-2 items-center mt-2">
                      <div>topic #3</div>
                      <div className="pl-4 w-20 overflow-hidden text-ellipsis">
                        {topicTitle}
                      </div>
                      <div className="flex justify-between gap-2">
                        <AiOutlineEdit className="w-7 h-7  text-[#4362ec] rounded-2xl" />
                        <RiDeleteBin6Line className="py-2 px-2 bg-red-500 rounded-2xl text-white w-8 h-8" />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className={[comopen === 2 ? "" : "hidden"]}>
            {memberdata.map((m, i) => (
              <Members membersdata={m} key={i} />
            ))}
          </div>
          <div className={[comopen === 3 ? "" : "hidden"]}>
            <Access id={id} comid={comid} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
