"use client";
import Authcheck from "@/Authcheck";
import { API } from "@/Essentials";
import AnalyticsIcon from "@/app/assets/AnalyticsIcon";
import AudienceIcon from "@/app/assets/AudienceIcon";
import OrderTrackingIcon from "@/app/assets/OrderTrackingIcon";
import PopularityIcon from "@/app/assets/PopularityIcon";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { BiChevronDown } from "react-icons/bi";
import { Card, Title, BarChart, DonutChart } from "@tremor/react";
import Empty from "../../assets/image/iconContainer.png";
import Image from "next/image";

function page() {
  const [mounted, setMounted] = useState(false);
  const [check, setCheck] = useState(false);
  const [data, setData] = useState({});
  const [name, setName] = useState();
  const [ne, setNe] = useState();
  const [id, setId] = useState("")
  const [order, setOrder] = useState([])

  useEffect(() => {
    const id = sessionStorage.getItem("id")
    setId(id)
  }, [])

  useEffect(() => {
    if (id) {

      axios.get(`${API}/fetchallorders/${id}`).then((res) => {
        console.log(res.data)
        setOrder(res.data.orders)
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [id])

  const cities = [
    {
      name: "New York",
      sales: 9800,
    },
    {
      name: "London",
      sales: 4567,
    },
    {
      name: "Hong Kong",
      sales: 3908,
    },
    {
      name: "San Francisco",
      sales: 2400,
    },
    {
      name: "Singapore",
      sales: 1908,
    },
    {
      name: "Zurich",
      sales: 1398,
    },
  ];
  const valueFormatter = (number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`;
  const chartdata = [
    {
      name: "Amphibians",
      "Number of threatened species": 2488,
    },
    {
      name: "Birds",
      "Number of threatened species": 1445,
    },
    {
      name: "Crustaceans",
      "Number of threatened species": 743,
    },
  ];
  const dataFormatter = (number) => {
    return "$ " + Intl.NumberFormat("us").format(number).toString();
  };

  const fetchdata = async () => {
    const id = await sessionStorage.getItem("id");
    if (id) {
      await axios
        .post(`${API}/workspacelogin`, {
          id,
        })
        .then(function (res) {
          setName(res.data.user.fullname);
          setNe(res.data.user);
          setData({
            popularity: res.data.user.popularity,
            members: res.data.user.totalmembers,
            badges: res.data.user.badgescount,
            orders: res.data.user.orders,
          });
          setCheck(true);
        })
        .catch(function (error) {
          console.log(error);
          setCheck(false);
        });
    }
  };

  useEffect(() => {
    if (!mounted) {
      fetchdata();
      setMounted(true);
    }
  }, [mounted]);

  const generateRandomSequence = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 17;
    let sequence = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      sequence += characters.charAt(randomIndex);
    }
    return sequence;
  };

  if (check) {
    return (
      <div>
        <Toaster />
        <div className="pt-1 pb-10">
          <div className="flex justify-between items-center">
            <div className="font-medium pl-4 text-[18px]  text-[#8B8D97] ">
              Dashboard
            </div>
          </div>
          <div className="w-[100%] md:px-10">
            <div className="h-[350px] w-[100%] vs:max-sm:flex-col bg-white sm:px-2 flex justify-between md:px-10 mt-4 rounded-2xl ">
              <div className="h-[100%] sm:w-[65%] rounded-3xl bg-white sm:shadow-[0_1px_12px_20px_rgba(104,151,156,0.03)]">
                <div className="flex items-center vs:max-md:space-x-2 space-x-4 pt-2 pl-2  ">
                  <AnalyticsIcon />
                  <div className="font-medium">Analytics</div>
                  <div className="py-1 px-4 font-medium flex space-x-2 rounded-lg text-[12px] text-[#5570F1] bg-[#EAEDFD] items-center">
                    <div> Sales</div>
                    <div>
                      <BiChevronDown size={20} />
                    </div>
                  </div>
                </div>
                {/* <Card className="h-10">
            <BarChart
              className="mt-6"
              data={chartdata}
              index="name"
              categories={["Number of threatened species"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              yAxisWidth={48}
            />
          </Card> */}
                <div className="h-[70%] w-full flex items-center justify-center text-[40px] font-medium">
                  No Data
                </div>
              </div>
              <div className="h-[100%] vs:max-sm:hidden min-w-[200px] sm:w-[32%] rounded-3xl bg-white sm:shadow-[0_1px_12px_20px_rgba(104,151,156,0.03)]">
                <div className="flex items-center vs:max-md:space-x-2 space-x-4 pt-2 pl-2">
                  <div>
                    <PopularityIcon />
                  </div>
                  <div className="font-medium">Popularity</div>
                </div>
                <div className="h-[70%] w-full flex items-center justify-center text-[80px] font-medium">
                  {ne?.popularity}
                </div>
              </div>
            </div>
            {/* phone */}
            <div className="h-[200px] w-[100%] sm:hidden mt-4 flex justify-between items-center">
              <div className="h-[100%] w-[49%] bg-white rounded-2xl">
                <div className="flex items-center vs:max-sm:space-x-2 space-x-4 pt-2 pl-2">
                  <div>
                    <AudienceIcon />
                  </div>
                  <div className="font-medium">Audience</div>
                </div>
                <div className="h-[60%] w-full flex items-center justify-center text-[40px] font-semibold">
                  {ne?.totalmembers}
                </div>
              </div>
              <div className="h-[100%] w-[49%] bg-white rounded-2xl">
                <div className="flex items-center  vs:max-sm:space-x-2 space-x-4 pt-2 pl-2">
                  <div>
                    <PopularityIcon />
                  </div>
                  <div className="font-medium">Popularity</div>
                </div>
                <div className="h-[60%] w-full flex items-center justify-center text-[40px] font-semibold">
                  {ne?.popularity}
                </div>
              </div>
            </div>
            <div className="h-[350px] w-[100%] sm:flex justify-between flex-col gap-3 sm:px-2 md:px-10 mt-4 rounded-2xl ">
              {/* <div className="h-[90%] sm:w-[32%] min-w-[200px] rounded-3xl bg-white sm:shadow-[0_1px_12px_20px_rgba(104,151,156,0.03)]">
                <div className="flex items-center vs:max-md:space-x-2 space-x-4 pt-2 pl-2">
                  <div>
                    <OrderTrackingIcon />
                  </div>
                  <div className="font-medium">Order Tracking</div>
                </div>
                <div className="h-[100%] w-full flex-col flex items-center mt-2 ">
                  <Image src={Empty} alt="No order" />
                  <div className="text-[18px] font-semibold mt-2">
                    No Orders Yet?
                  </div>
                  <div className="flex flex-col items-center justify-center mt-2 text-[14px]">
                    <div>Add products to your store and start </div>
                    <div>selling to see orders here.</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="py-2 px-10 rounded-2xl bg-[#5570F1] text-white mt-4 ">
                      + New product
                    </div>
                  </div>
                </div>
              </div> */}

              {order.map((d, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div>

                    orderId :  {d?.orderId}
                    createdAt :  {d?.createdAt?.slice(0, 10)}
                    currentStatus
                    :  {d?.currentStatus
                    }
                    <div>Total: {d?.total}</div>
                  </div>
                </div>
              ))}

              <div className="h-[90%] w-[32%] min-w-[200px] rounded-3xl vs:max-sm:hidden bg-white sm:shadow-[0_1px_12px_20px_rgba(104,151,156,0.03)]">
                <div className="flex items-center vs:max-md:space-x-2 space-x-4 pt-2 pl-2">
                  <div>
                    <AudienceIcon />
                  </div>
                  <div className="font-medium">Audience</div>
                </div>
                {/* <Card className="max-w-lg">
              <Title>Sales</Title>
              <DonutChart
                className="mt-6"
                data={cities}
                category="sales"
                index="name"
                valueFormatter={valueFormatter}
                colors={[
                  "slate",
                  "violet",
                  "indigo",
                  "rose",
                  "cyan",
                  "amber",
                ]}
              />
            </Card> */}
                <div className="h-[70%] w-full flex items-center justify-center text-[80px] font-medium">
                  {ne?.totalmembers}
                </div>
              </div>

              <div className="h-[90%] w-[32%] min-w-[200px] rounded-3xl vs:max-sm:hidden bg-white sm:shadow-[0_1px_12px_20px_rgba(104,151,156,0.03)]">
                <div className="flex items-center justify-center vs:max-md:space-x-2 space-x-4 pl-2 pt-8">
                  <div className="font-medium text-[20px] text-[#1B2559]">
                    Your earnings today
                  </div>
                </div>
                <div className="h-[60%] w-full flex-col flex items-center justify-center text-[50px] text-[#1B2559] font-medium">
                  ${ne?.revenue}
                  <div className="flex flex-col justify-center items-center mt-6 text-[14px]">
                    <div>Update your payout method </div>
                    <div>in Settings</div>
                  </div>
                </div>

                <div></div>
                <div className="flex items-center justify-center">
                  <div className="py-2 px-10 rounded-2xl bg-[#5570F1] text-white ">
                    Withdraw All Earnings
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Toaster />
        <div className="overflow-auto pt-1 scrollbar-hide   ">
          <div className="flex justify-between items-center">
            <div className="font-medium pl-4 text-[18px] py-2 px-10 bg-[#f2f2f2] animate-pulse  rounded-xl"></div>
          </div>
          <div className="w-[100%] md:px-10">
            <div className="h-[350px] w-[100%] vs:max-sm:flex-col bg-white sm:px-2 flex justify-between md:px-10 mt-4 rounded-2xl ">
              <div className="h-[100%] sm:w-[65%] rounded-3xl bg-[#f2f2f2] animate-pulse sm:shadow-[0_1px_12px_20px_rgba(104,151,156,0.03)]"></div>
              <div className="h-[100%] vs:max-sm:hidden min-w-[200px] sm:w-[32%] rounded-3xl bg-[#f2f2f2] animate-pulse sm:shadow-[0_1px_12px_20px_rgba(104,151,156,0.03)]"></div>
            </div>
            {/* phone */}
            <div className="h-[200px] w-[100%] sm:hidden mt-4 flex justify-between items-center">
              <div className="h-[100%] w-[49%]  bg-[#f2f2f2] animate-pulse rounded-2xl">
                <div className="h-[60%] w-full flex items-center justify-center text-[40px] font-semibold"></div>
              </div>
              <div className="h-[100%] w-[49%] bg-[#f2f2f2] animate-pulse rounded-2xl"></div>
            </div>
            <div className="h-[350px] w-[100%] sm:flex justify-between sm:px-2 md:px-10 mt-4 rounded-2xl ">
              <div className="h-[90%] sm:w-[32%] min-w-[200px] rounded-3xl bg-[#f2f2f2] animate-pulse sm:shadow-[0_1px_12px_20px_rgba(104,151,156,0.03)]"></div>

              <div className="h-[90%] w-[32%] min-w-[200px] rounded-3xl vs:max-sm:hidden bg-[#f2f2f2] animate-pulse sm:shadow-[0_1px_12px_20px_rgba(104,151,156,0.03)]"></div>

              <div className="h-[90%] w-[32%] min-w-[200px] rounded-3xl vs:max-sm:hidden bg-[#f2f2f2] animate-pulse sm:shadow-[0_1px_12px_20px_rgba(104,151,156,0.03)]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Authcheck(page);
