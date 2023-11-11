"use client";
import React, { useEffect, useState } from "react";
import Productinformation from "./productinformation";
import Link from "next/link";
import Empty from "../../assets/image/emptyStore.png";
import { API } from "@/Essentials";
import axios from "axios";
import Image from "next/image";
import Authcheck from "@/Authcheck";

function page() {
  const [data, setData] = useState([]);
  const [analytics, setAnalytics] = useState()
  const [id, setId] = useState();
  const [success, setSuccess] = useState();
  const [load, setLoad] = useState(false);
  const [col, setCol] = useState({
    d1: "",
    d2: "",
    d3: null
  })
  const list = [
    { name: "Retail" },
    { name: "Fashion and Apparel" },
    { name: "Electronics" },
    { name: "Home And Furniture" },
    { name: "Beauty and Personal Care" },
    { name: "Health and Wellness" },
    { name: "Food and Grocery" },
    { name: "Books and Media" },
    { name: "Toys and Games" },
    { name: "Jewellery and Accessories" },
    { name: "Art and Crafts" },
    { name: "Sports and Outdoors" },
    { name: "Electronics Accessories" },
    { name: "Handmade and Artisanal Products" },
  ]

  const handleFileChangeCol = (e) => {
    const selectedFile = e.target.files[0];
    const sendFile = URL.createObjectURL(selectedFile);
    setCol({ ...col, d3: sendFile });
  };

  const sendCol = async (e) => {
    e.preventDefault()
    const coltoSend = {
      name: col.d1,
      category: col.d2,
      verfication: col.d3,
    }
    try {
      const res = await axios.post(`${API}/createCollection/${id}`, coltoSend)
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  const remove = async (e, colid) => {
    e.preventDefault()

    try {
      const res = await axios.delete(`${API}/collectiondelete/${id}/${colid}`)
      console.log(res.data
      )
      console.log("work")
    } catch (e) {
      console.log(e)
    }
  }

  const [store, setStore] = useState({
    d1: "",
    d2: "",
    d3: "",
    d4: "",
    d5: "",
    d6: "",
    d7: "",
    d8: "",
    d9: "",
  });


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const sendFile = URL.createObjectURL(selectedFile);
    setData({ ...store, d9: sendFile });
  };

  const send = async (e) => {
    e.preventDefault();
    try {
      const datatosend = {
        buildingno: store.d1,
        city: store.d2,
        state: store.d3,
        postal: store.d4,
        landmark: store.d5,
        gst: store.d6,
        businesscategory: store.d7,
        documenttype: store.d8,
        documentfile: store.d9,
      };
      const res = await axios.post(
        `${API}/registerstore/64b84197281876c462d40978`,
        datatosend
      );
      console.log(res.data);
    } catch (e) { }
  };

  const handleDelete = (userid, pid, collecid, index) => {
    const updatedData = data.map((d) => {
      if (d.collection._id === collecid) {
        const updatedProducts = d.products.filter((product) => product._id !== pid);
        return { ...d, products: updatedProducts };
      }
      return d;
    });
    setData(updatedData);
    const res = axios.delete(`${API}/deleteproduct/${userid}/${collecid}/${pid}`).then((res) => console.log(res.data)).catch((e) => console.log(e))

  }

  // useEffect(() => {
  //   const fetch = async () => {
  //     const id = sessionStorage.getItem("id");
  //     setId(id);
  //     setLoad(false);
  //     await axios
  //       .get(`${API}/fetchaworkspaceproducts/${id}`)
  //       .then(function (res) {
  //         if (res.data.success) {
  //           // handle success
  //           const product = res.data.products;
  //           const urls = res.data.urls;
  //           // console.log(res.data);
  //           const merged = product.map((p, i) => ({
  //             p,
  //             urls: urls[i],
  //             a: i,
  //           }));

  //           setData(merged);
  //           setSuccess(true);
  //           // console.log("ra");
  //           setLoad(true);
  //         } else {
  //           setSuccess(false);
  //         }
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         // console.log(error);
  //         setSuccess(false);
  //       });
  //   };
  //   fetch();
  // }, []);

  useEffect(() => {
    const fetchit = async () => {
      try {
        setLoad(false)
        const res = await axios.get(
          `${API}/fetchProducts/${id}`
        );
        console.log(res.data);
        if (res.data.success) {
          setSuccess(true)
          setData(res.data.collectionsWithProducts);
          setAnalytics([res.data.detailsToSend])
        }
        else { setSuccess(false) }
        setLoad(true)
      } catch (e) {
        console.log(e);
      }
    };
    if (id) {
      fetchit();
    }
  }, [id]);

  useEffect(() => {
    const myid = sessionStorage.getItem("id")
    setId(myid)
  }, [])

  console.log(data)
  console.log(analytics)

  if (load) {
    if (success) {
      return (
        <div>
          <div className="overflow-auto pt-1 scrollbar-hide h-full ">
            <div className="flex justify-between items-center">
              <div className="sm:font-medium sm:pl-4 text-[18px]  text-[#8B8D97]  ">
                Store
              </div>
              <Link
                href="/main/store/addproduct"
                className="py-2 vs:max-sm:hidden px-6 bg-blue-600 text-white rounded-2xl"
              >
                Add Product
              </Link>
            </div>


            <div>
              {analytics?.map((d, i) => (
                <div key={i}>
                  <div> All orders-{d?.orders} </div>
                  <div>Completed
                    -{d?.completedOrders
                    } </div>
                  <div>Pending-{d?.pendingOrders} </div>
                  <div>customers-{d?.customers} </div>
                  <div>Earning-{d?.earnings} </div>
                </div>
              ))}
            </div>


            {/* collection create krne ka pop up starts */}

            < div className='flex justify-center items-center flex-col h-[40vh]' >
              <div>
                <div>Collection name</div>
                <input className='border-2 p-1 outline-none' value={col.d1} onChange={(e) => setCol({ ...col, d1: e.target.value })} />
              </div>
              <div>
                <div>Collection name</div>
                <select value={col.d2} onChange={(e) => setCol({ ...col, d2: e.target.value })}>
                  {list.map((d, i) => (
                    <option key={i} value={d.name} className=''>{d.name}</option>
                  ))}
                </select>
                <div>
                  {col.d2 === "Food and Grocery" &&
                    <>
                      <div>
                        <div>Important code</div>
                        <input type="file" onChange={(e) => handleFileChangeCol(e)} />
                      </div>
                    </>
                  }
                </div>
                <button className='bg-black text-white p-3 rounded-xl' onClick={(e) => sendCol(e)}>Create Collection</button>

              </div>
            </div>

            {/* collection create krne ka pop up ends */}

            {/* store create krne ke liye starting*/}
            {/* <div>
              <div>
                <input
                  type="text"
                  className="border-2 outline-none p-2"
                  value={store.d1}
                  onChange={(e) => setStore({ ...store, d1: e.target.value })}
                />
                <input
                  type="text"
                  className="border-2 outline-none p-2"
                  value={store.d2}
                  onChange={(e) => setStore({ ...store, d2: e.target.value })}
                />
                <input
                  type="text"
                  className="border-2 outline-none p-2"
                  value={store.d3}
                  onChange={(e) => setStore({ ...store, d3: e.target.value })}
                />
                <input
                  type="number"
                  className="border-2 outline-none p-2"
                  value={store.d4}
                  onChange={(e) => setStore({ ...store, d4: e.target.value })}
                />
                <input
                  type="text"
                  className="border-2 outline-none p-2"
                  value={store.d5}
                  onChange={(e) => setStore({ ...store, d5: e.target.value })}
                />
                <input
                  type="number"
                  className="border-2 outline-none p-2"
                  value={store.d6}
                  onChange={(e) => setStore({ ...store, d6: e.target.value })}
                />
                <input
                  type="text"
                  className="border-2 outline-none p-2"
                  value={store.d7}
                  onChange={(e) => setStore({ ...store, d7: e.target.value })}
                />
                <input
                  type="text"
                  className="border-2 outline-none p-2"
                  value={store.d8}
                  onChange={(e) => setStore({ ...store, d8: e.target.value })}
                />
                <input type="file" onChange={(e) => handleFileChange(e)} />
              </div>
              <button onClick={(e) => send(e)}>send</button>
            </div> */}
            {/* store create krne ke liye ending  */}


            {/* <div className=" sm:grid-cols-4 w-full grid-cols-2 grid gap-2 pt-8 sm:pl-[4%] vs:max-sm:px-[2%] ">
              <div className="sm:h-36 vs:max-sm:h-28  sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-white ring-1 ring-[#f9f9f9] ">
                <Image
                  src={Cus}
                  className="h-12 w-12 sm:max-md:hidden sm:h-16 sm:w-16"
                />
                <div>
                  <div className="font-semibold text-[18px] text-[#93A3AB]">
                    Customers
                  </div>
                  <div
                    className="flex justify-between items-center pt-2 px-2 gap-6 w-[100%]
        "
                  >
                    <div className="sm:text-[25px] text-[20px] font-bold  vs:max-sm:font-semibold ">
                      3k
                    </div>
                    <div>+5.27%</div>
                  </div>
                </div>
              </div>
              <div className="sm:h-36 vs:max-sm:h-28  sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-white ring-1 ring-[#f9f9f9] ">
                <Image
                  src={Sal}
                  className="h-12 w-12 sm:max-md:hidden sm:h-16 sm:w-16"
                />
                <div>
                  <div className="font-semibold text-[18px] text-[#93A3AB]">
                    Orders
                  </div>
                  <div
                    className="flex justify-between items-center pt-2 px-2 gap-6 w-[100%]
        "
                  >
                    <div className="sm:text-[25px] text-[20px] font-bold  vs:max-sm:font-semibold ">
                      3k
                    </div>
                    <div>+5.27%</div>
                  </div>
                </div>
              </div>
              <div className="sm:h-36 vs:max-sm:h-28  sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-white ring-1 ring-[#f9f9f9] ">
                <Image
                  src={Tot}
                  className="h-12 w-12 sm:max-md:hidden sm:h-16 sm:w-16"
                />
                <div>
                  <div className="font-semibold text-[18px] text-[#93A3AB]">
                    Items Sold
                  </div>
                  <div
                    className="flex justify-between items-center pt-2 px-2 gap-6 w-[100%]
        "
                  >
                    <div className="sm:text-[25px] text-[20px] font-bold  vs:max-sm:font-semibold ">
                      3k
                    </div>
                    <div>+5.27%</div>
                  </div>
                </div>
              </div>
              <div className="sm:h-36 vs:max-sm:h-28  sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-white ring-1 ring-[#f9f9f9] ">
                <Image
                  src={Rev}
                  className="h-12 w-12 sm:max-md:hidden sm:h-16 sm:w-16"
                />
                <div>
                  <div className="font-semibold text-[18px] text-[#93A3AB]">
                    Today Revenue
                  </div>
                  <div
                    className="flex justify-between items-center pt-2 px-2 gap-6 w-[100%]
        "
                  >
                    <div className="sm:text-[25px] text-[20px] font-bold  vs:max-sm:font-semibold ">
                      3k
                    </div>
                    <div>+5.27%</div>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="pt-4">
              <div className="flex w-full vs:max-sm:hidden sm:pt-4 px-4 justify-between">
                <div className="w-64 sm:max-md:w-52 font-medium flex justify-start pl-4 ">
                  Product
                </div>
                <div className="w-36 sm:max-md:w-24 flex justify-center font-medium ">
                  Price
                </div>
                <div className="w-36  sm:max-md:w-24 flex justify-center font-medium ">
                  Inventory
                </div>
                <div className="w-36 sm:max-md:w-24 flex justify-center font-medium ">
                  Status
                </div>
                <div className="w-36 sm:max-md:w-24 flex justify-center font-medium "></div>
              </div>

              {data.map((d, i) => (
                <div key={i} className="sm:pt-4">
                  <div className="flex justify-between my-2 items-center" >
                    <div>{d.collection.name}</div>
                    <div className="flex justify-center
                     items-center gap-2">
                      <div onClick={(e) => remove(e, d.collection._id)}>
                        remove collection
                      </div>
                      <Link className="bg-black text-white p-2 font-semibold rounded-xl" href={{
                        pathname: "/main/store/addproduct", query: {
                          id: d.collection.creator,
                          collecid: d.collection._id,
                        }
                      }}>Add Product</Link>
                    </div>

                  </div>

                  {d.products?.length > 0 ? (
                    <div>
                      {d.products.map((f, g) => (
                        <Productinformation key={g} index={g} handleDelete={handleDelete} data={f} collectionid={d.collection._id} userid={f.creator} />
                      ))}
                    </div>
                  ) : (
                    <div>No products in this collection.</div>
                  )}


                </div>
              ))}

              <Link
                href="/main/store/addproduct"
                className="animate-bounce sm:hidden h-12 w-12  bg-blue-700 rounded-full flex justify-center items-center fixed right-5 sm:right-10 bottom-20 cursor-pointer"
              >
                <div className="text-white text-[30px] font-semibold">+</div>
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="overflow-auto pt-2 scrollbar-hide flex flex-col items-center justify-center h-[80vh] sm:mx-5 ">
            <Image src={Empty} className="h-96 w-96" alt="create community" />
            <div className="font-semibold text-[18px] mt-6">
              No products - yet!
            </div>
            <div className="flex items-center flex-col justify-center">
              <div>
                Look like you haven’t added a product, no worries. click the
              </div>
              <div>“add new product button“</div>
            </div>

            <Link
              href="/main/store/addproduct"
              className="py-2 px-6 bg-blue-600 text-white rounded-2xl mt-6"
            >
              Add new product
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

          <div className=" sm:grid-cols-4 w-full grid-cols-2 grid gap-2 pt-8 sm:pl-[4%] vs:max-sm:px-[2%] ">
            <div className="sm:h-36 vs:max-sm:h-28  animate-pulse px-40 sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-[#f2f2f2] ring-1 ring-[#f9f9f9] "></div>
            <div className="sm:h-36 vs:max-sm:h-28  animate-pulse px-40 sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-[#f2f2f2] ring-1 ring-[#f9f9f9] "></div>
            <div className="sm:h-36 vs:max-sm:h-28  animate-pulse px-40 sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-[#f2f2f2] ring-1 ring-[#f9f9f9] "></div>
            <div className="sm:h-36 vs:max-sm:h-28  animate-pulse px-40 sm:w-[80%] rounded-3xl items-center flex justify-between md:px-10 vs:max-sm:px-2 bg-[#f2f2f2] ring-1 ring-[#f9f9f9] "></div>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Authcheck(page);
